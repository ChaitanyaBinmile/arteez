import { Response } from 'express';
export function sendResponse(res: Response, httpCode: number, response: object, message = '') {
  res.status(httpCode).json({
    code: httpCode,
    message: message,
    data: response ? response : {},
  });
}

