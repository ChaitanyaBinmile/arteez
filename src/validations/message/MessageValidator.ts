import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { SchemaOf } from 'yup';
import {  validateRequestBody } from '../../../lib/utils/validationHelper';
import { INITIAL_PAGE_NUM, MINIMUM_RECORD_NUM } from '../../../lib/utils/ApiConstants';

async function saveUser(req: Request, res: Response, next: NextFunction) {
  // type YupSchema = yup.AnyObjectSchema;
  type YupSchema = SchemaOf<{
    email: string;
    password: string;
  }>;

  const schema: YupSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).*$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (@#$%^&+=)',
      )
      .min(9, 'Password must be between 9 and 15 characters long')
      .max(15, 'Password must be between 9 and 15 characters long'),
  });

  await validateRequestBody(schema, req, res, next);
}


async function findUser(req: Request, res: Response, next: NextFunction) {
  type YupSchema = SchemaOf<{
    limit: number;
    page_num: number;
  }>;
  const schema: YupSchema = yup.object().shape({
    limit: yup.number().required().min(MINIMUM_RECORD_NUM),
    page_num: yup.number().required().min(INITIAL_PAGE_NUM),
  });
  await validateRequestBody(schema, req, res, next);
}


const messageValidator = {
  saveUser,
  findUser,
};

export default messageValidator;