import fs from 'fs';
import path from 'path';
import multer, { Multer } from 'multer';
import { Request } from 'express';

// File path in the system
const FILE_PATH = path.join('../uploads');
const destinationDir = path.join(__dirname, '..', FILE_PATH);

if (!fs.existsSync(destinationDir)) {
  fs.mkdirSync(destinationDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (_req: Request, _file, cb) => {
    cb(null, path.join(__dirname, '..', FILE_PATH));
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileExt = path.extname(file.originalname); // Get the file extension
    const newFileName = file.fieldname + '-' + uniqueSuffix + fileExt; // Include the file extension
    cb(null, newFileName);
  },
});

const fileFilter = (
  _req: Request,
  // eslint-disable-next-line no-undef
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.csv') {
    return callback(new Error('Invalid file type'), false);
  }
  callback(null, true);
};

const upload: Multer = multer({
  storage: storage,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  fileFilter: fileFilter as any,
});



const memoryStorage = multer.memoryStorage();


const uploadStorage: Multer = multer({
  storage: memoryStorage,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  fileFilter: fileFilter as any,
});

export { upload, uploadStorage };
