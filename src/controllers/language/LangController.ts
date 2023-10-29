import { getDataService } from './LanService';
import { ResponseData } from './interface';
import { Request, Response } from 'express';

export const getData = async (req: Request, res: Response) => {
  try {
    const data = await getDataService(req, res);
    res.json(data);
  } catch (error) {
    const errorData: ResponseData = {
      id: -1,
      username: 'Error occurred',
    };

    res.json(errorData);

    throw error;
  }
};
