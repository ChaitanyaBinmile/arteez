/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
const router = express.Router();
import { authorizeAnonymous } from '../../middlewares/authenticate';
import candidateJobValidator from '../../validations/candidate/JobValidator';
import candidateJobController from '../../controllers/candidate/JobController';

router.post('/list-jobs', authorizeAnonymous, candidateJobValidator.getJobList, candidateJobController.getJobList);

export default [router];
