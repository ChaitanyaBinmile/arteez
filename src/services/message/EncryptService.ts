import * as CryptoJS from 'crypto-js';
import encrypt from '../../models/encryptModel';
import { Request, Response } from 'express';
import { HmacResult, ResponseDataEncrypt } from '../../controllers/language/interface';

const hmacResult: HmacResult = {
  words: [809],
  sigBytes: 400,
};


const createKeyService = async (req: Request, res: Response): Promise<HmacResult> => {
  const data: ResponseDataEncrypt = req.body as ResponseDataEncrypt;
  const newData = {
    name: data.name,
    email: data.email,
    password: data.password,
  };
  await encrypt.create(newData);
  const entry = await encrypt.findOne({ where: { name: data.name } });

  if (entry !== null) {
    const key: string = entry.toString();
    return CryptoJS.HmacSHA1(key, key);
  }
  res.send('error in sending');
  return hmacResult;

};

export const EncryptService = {
  createKeyService,
};
