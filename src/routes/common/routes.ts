/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
const router = express.Router();
import recruiterHealthController from '../../controllers/HealthController';


router.get('/test', recruiterHealthController.test);
router.get('/health', recruiterHealthController.health);

export default [router];
