/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
const router = express.Router();

import { authorizeAnonymous } from '../../middlewares/authenticate';
import messageValidator from '../../validations/message/MessageValidator';
import messageController from '../../controllers/message/MessageController';
import LangController from '../../controllers/language/LangController';
import { EncryptController } from '../../controllers/encrypt/encController';

router.post('/save-user', authorizeAnonymous, messageValidator.saveUser, messageController.saveUser);
router.get('/user-list', authorizeAnonymous, messageValidator.findUser, messageController.findUser);

router.get('/readlang',LangController.getData);
router.post('/createlang',LangController.createData);
router.patch('/updatelang/:id', LangController.updateData);
router.delete('/deletelang/:id', LangController.deleteData);

router.post('/savedata', EncryptController.createKeyController);

export default [router];
