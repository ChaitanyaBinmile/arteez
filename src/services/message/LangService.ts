import { Request, Response } from 'express';
import languages from '../../models/testModel';
import { ResponseData } from '../../controllers/language/interface';

const getDataService = async (_req: Request, res: Response) => {
  try {
    const data = await languages.findAll();
    return data;
  } catch (error) {
    const errorData: ResponseData = {
      name: 'Error occurred',
    };

    res.json(errorData);

    throw error;
  }
};

const getDataServiceByID = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await languages.findByPk(id);
    return data;
  } catch (error) {
    const errorData: ResponseData = {
      name: 'Error occurred',
    };

    res.json(errorData);
    throw error;
  }
};
const createDataService = async (req: Request, res: Response) => {
  try {
    const data: ResponseData = req.body as ResponseData;
    const newData = {
      name: data.name,
    };

    await languages.create(newData);
    return true;
  } catch (error) {
    const errorData: ResponseData = {
      name: 'Error occurred',
    };

    res.json(errorData);
    throw error;
  }
};

const updateDataService = async (req: Request, res: Response) => {
  try {
    const data: ResponseData = req.body as ResponseData;
    const id = req.params.id;
    await languages.update(data, {
      where: {
        id: id,
      },
    });
    return true;
  } catch (error) {
    const errorData: ResponseData = {
      name: 'Error occurred',
    };

    res.json(errorData);
  }
};

const deleteDataService = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await languages.update(
      {
        is_active: false,
        is_deleted: true,
      },
      {
        where: {
          id: id,
        },
      },
    );
    return true;
  } catch (error) {
    const errorData: ResponseData = {
      name: 'Error occurred',
    };

    res.json(errorData);
    throw error;
  }
};

const LangService = {
  getDataService,
  getDataServiceByID,
  createDataService,
  updateDataService,
  deleteDataService,
};

export default LangService;
