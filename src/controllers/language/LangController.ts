import LangService from '../../services/message/LangService';
import SchemaValidate from './Lang.validation';
import { ResponseData } from './interface';
import { Request, Response } from 'express';

const getData = async (req: Request, res: Response) => {
  try {
    const data = await LangService.getDataService(req, res);
    res.json(data);
  } catch (error) {
    const errorData: ResponseData = {
      name: 'Error occurred',
    };

    res.json(errorData);
  }
};

const getDataByID = async (req: Request, res: Response) => {
  const { error } = SchemaValidate.idSchema.validate(req.params.id);
  if (!error) {
    try {
      const data = await LangService.getDataServiceByID(req, res);
      res.json(data);
    } catch (error) {
      const errorData: ResponseData = {
        name: 'Error occurred',
      };

      res.json(errorData);
    }
  }
};

const createData = async (req: Request, res: Response) => {
  const { error } = SchemaValidate.updateUserSchema.validate(req.body);

  if (!error) {
    try {
      const data = await LangService.createDataService(req, res);
      res.json(data);
    } catch (error) {
      const errorData: ResponseData = {
        name: 'Error occurred',
      };

      res.json(errorData);
    }
  } else {
    res.send('error');
  }
};
const updateData = async (req: Request, res: Response) => {
  const userValidationResult = SchemaValidate.updateUserSchema.validate(req.body);
  const idValidationResult = SchemaValidate.idSchema.validate(req.params.id);
  if (userValidationResult.error || idValidationResult.error) {
    const errorData = {
      userValidationError: userValidationResult.error ? userValidationResult.error.details : null,
      idValidationError: idValidationResult.error ? idValidationResult.error.details : null,
    };
    res.status(400).json(errorData);
  } else {
    try {
      const data = await LangService.updateDataService(req, res);
      res.json(data);
    } catch (error) {
      const errorData: ResponseData = {
        name: 'Error occurred',
      };

      res.json(errorData);
    }
  }
};

const deleteData = async (req: Request, res: Response) => {
  const { error } = SchemaValidate.idSchema.validate(req.params.id);
  if (!error) {
    try {
      const data = await LangService.deleteDataService(req, res);
      res.json(data);
    } catch (error) {
      const errorData: ResponseData = {
        name: 'Error occurred',
      };

      res.json(errorData);
    }
  }
};

const LangController = {
  getData,
  getDataByID,
  createData,
  updateData,
  deleteData,
};

export default LangController;
