/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
const router = express.Router();
import { authorizeAnonymous } from '../../middlewares/authenticate';
import messageValidator from '../../validations/message/MessageValidator';
import messageController from '../../controllers/message/MessageController';
import { getData } from '../../controllers/language/LangController';

router.post('/save-user', authorizeAnonymous, messageValidator.saveUser, messageController.saveUser);
router.get('/user-list', authorizeAnonymous, messageValidator.findUser, messageController.findUser);
router.get('/lang',getData);

export default [router];
