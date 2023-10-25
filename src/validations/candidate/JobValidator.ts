import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { SchemaOf } from 'yup';
import {  validateRequestBody } from '../../../lib/utils/validationHelper';
import { INITIAL_PAGE_NUM, MINIMUM_RECORD_NUM} from '../../../lib/utils/ApiConstants';

async function getJobList(req: Request, res: Response, next: NextFunction) {
  type YupSchema = SchemaOf<{
    search_text: string | undefined;
    limit: number;
    page_num: number;
  }>;
  const schema: YupSchema = yup.object().shape({
    search_text: yup.string().optional(),
    limit: yup.number().required().min(MINIMUM_RECORD_NUM),
    page_num: yup.number().required().min(INITIAL_PAGE_NUM),
  });
  await validateRequestBody(schema, req, res, next);
}

const candidateJobValidator = {
  getJobList,
};

export default candidateJobValidator;