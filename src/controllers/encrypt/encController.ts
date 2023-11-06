import { Request, Response } from 'express';
import { EncryptService } from '../../services/message/EncryptService';

const createKeyController = async (req: Request, res: Response) => {
  try {
    const key = await EncryptService.createKeyService(req, res);
    res.status(200).send(key);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const EncryptController = {
  createKeyController,
};
