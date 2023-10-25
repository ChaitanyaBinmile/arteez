import { NextFunction, Request, Response } from 'express';
import { SchemaOf } from 'yup';
import { sendResponse } from './JsonResponse';
import { RESPONSE_CODE } from './ApiConstants';

export async function validateRequestParams(schema: SchemaOf<any>, req: Request, res: Response, next: NextFunction) {
  try {
    await schema.validate(req.params);
    next();
  } catch (e) {
    return sendResponse(res, RESPONSE_CODE.HTTP_400_BAD_REQUEST, {}, (e as Error).message);
  }
}
export async function validateRequestBody(schema: SchemaOf<any>, req: Request, res: Response, next: NextFunction) {
  try {
    await schema.validate(req.body);
    next();
  } catch (e) {
    return sendResponse(res, RESPONSE_CODE.HTTP_400_BAD_REQUEST, {}, (e as Error).message);
  }
}
export async function validateRequestQuery(schema: SchemaOf<any>, req: Request, res: Response, next: NextFunction) {
  try {
    await schema.validate(req.query);
    next();
  } catch (e) {
    return sendResponse(res, RESPONSE_CODE.HTTP_400_BAD_REQUEST, {}, (e as Error).message);
  }
}
export async function validateRequest(schema: SchemaOf<any>, req: Request, res: Response, next: NextFunction) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const input = Object.assign(req.body, req.params, req.query);
    await schema.validate(input);
    next();
  } catch (e) {
    return sendResponse(res, RESPONSE_CODE.HTTP_400_BAD_REQUEST, {}, (e as Error).message);

  }
}





