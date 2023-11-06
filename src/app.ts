import express, { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import cors from 'cors';
import AppConfig from './../lib/utils/AppConfig';
import Logger from './../lib/utils/Logger';
import * as http from 'http';
import CandidateRoutes from './routes/candidate/routes';
import MessageRoutes from './routes/message/routes';
import CommonRoutes from './routes/common/routes';
import { API_RC_ROUTE_NOT_FOUND, API_RESPONSE_SUCCESS } from '../lib/utils/ApiConstants';
import Constants from './config/constant';
import { mongooseConnection }  from '../src/config/mongoose.database'; // Import the database connection
  
mongooseConnection()
  .then(() => {
    // Start your Express server here or perform other actions that depend on the database connection.
  })
  .catch((error) => {
    console.error('Error establishing the database connection:', error);
    // Handle the error appropriately.
  });
const corsOpts = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
  preflightContinue: false,
};

const TAG = 'server: ';
const app = express();

/** Rate Limiter */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes)
  // standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  // legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

/** Logging */
app.use(morgan('dev'));
/** Parse the request */
app.use(express.urlencoded({ extended: true }));
/** Takes care of JSON data */
app.use(express.json());
app.use(cors(corsOpts));

/** RULES OF OUR API */
// eslint-disable-next-line consistent-return
app.use((req: Request, res: Response, next: NextFunction) => {
  // set the CORS policy
  res.header('Access-Control-Allow-Origin', '*');
  // set the CORS headers
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');

  //set default language
  const selectedLanguage: string = req.params.language || (req.headers.language as string) || '';
  if (selectedLanguage) {
    interface AvailableLanguages {
      [key: string]: string;
    }

    const availableLanguages: AvailableLanguages = Constants.AVAIL_LANG;
    const selectedLanguageValue = availableLanguages[selectedLanguage];

    if (selectedLanguageValue) {
      app.set('lang', selectedLanguageValue);
    } else {
      app.set('lang', 'en');
    }
  } else {
    app.set('lang', 'en');
  }
  // set the CORS method headers
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
    return res.status(200).json({});
  }
  next();
});

/** Routes */
app.get('/api', (_req: Request, res: Response) =>
  res.status(200).json({
    code: API_RESPONSE_SUCCESS,
    message: 'running normally...',
    result: {
      name: AppConfig.app.name,
      env: AppConfig.env,
      version: AppConfig.app.version,
      build: AppConfig.app.build,
    },
  }),
);
app.use('/api/v1/candidate', CandidateRoutes);
app.use('/api/v1/message', MessageRoutes);
app.use('/api', CommonRoutes);

require('../src/config/test.db');
// require('../src/models/testModel');

// require('../src/models/encryptModel');

/** Error handling */
app.use((_req: Request, res: Response) => {
  const error = new Error('route not found');
  return res.status(404).json({
    code: API_RC_ROUTE_NOT_FOUND,
    message: error.message,
    name: AppConfig.app.name,
    env: AppConfig.env,
    version: AppConfig.app.version,
    build: AppConfig.app.build,
  });
});

function initialize() {
  try {
    Logger.log(TAG, 'starting server...');
    const httpServer = http.createServer(app);
    httpServer.listen(AppConfig.port, () => {
      // eslint-disable-next-line no-console
      console.debug(TAG, `The server is running on port ${AppConfig.port}`);
    });
  } catch (error) {
    Logger.log(TAG, (error as Error).message);
  }
}

initialize();
