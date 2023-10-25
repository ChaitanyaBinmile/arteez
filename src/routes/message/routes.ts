/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
const router = express.Router();
import { authorizeAnonymous } from '../../middlewares/authenticate';
import messageValidator from '../../validations/message/MessageValidator';
import messageController from '../../controllers/message/MessageController';

router.post('/save-user', authorizeAnonymous, messageValidator.saveUser, messageController.saveUser);
router.get('/user-list', authorizeAnonymous, messageValidator.findUser, messageController.findUser);

export default [router];
