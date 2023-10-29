import { Request, Response } from 'express';
import languages from '../../models/testModel';
import { ResponseData } from './interface';

export const getDataService = async (_req: Request, res: Response) => {
  try {
    const data = await languages.findAll();
    return data;
  } catch (error) {
    const errorData: ResponseData = {
      id: -1,
      username: 'Error occurred',
    };

    res.json(errorData);

    throw error;
  }
};
