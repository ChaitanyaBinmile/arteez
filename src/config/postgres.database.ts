import { Sequelize, Dialect } from 'sequelize';
import AppConfig from './../../lib/utils/AppConfig';

const dbName = AppConfig.db.database;
const dbUser = AppConfig.db.user;
const dbHost = AppConfig.db.host;
const dbPort = AppConfig.db.port;
const dbDriver = AppConfig.db.dialect as Dialect;
const dbPassword = AppConfig.db.password;
let enableLogging = false;
if (AppConfig.db.logging == 'true') {
  enableLogging = true;
}
const dbConnection = new Sequelize({
  dialect: dbDriver,
  host: dbHost,
  port: dbPort,
  username: dbUser,
  password: dbPassword,
  database: dbName,
  logging: enableLogging,
  pool: {
    max: 200, // Increase the max connection pool size as needed
  },
});

export async function connectToDatabase() {
  try {
    await dbConnection.authenticate();
    console.info('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export async function closeDatabaseConnection() {
  await dbConnection.close();
}

export default dbConnection;
