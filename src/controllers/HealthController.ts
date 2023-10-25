import { Request, Response } from 'express';
import { sendResponse } from '../../lib/utils/JsonResponse';
import AppConfig from './../../lib/utils/AppConfig';
import { RESPONSE_CODE } from '../../lib/utils/ApiConstants';
import Logger from './../../lib/utils/Logger';
import { getMessages } from '../../lib/utils/languageHelper';
import { MessagesTypes } from '../types/common/MessageDataType';
import Log from '../models/logs';


const TAG = 'HealthController';
export const test = async (_req: Request, res: Response) => {
  const messages = (await getMessages(_req)) as MessagesTypes;
  try {
    await Logger.logToDatabase(TAG, 'hello world', Logger.Priority.Low);
    const logs = await Log.findAll({
      offset: 0,
      limit: 5,
      order: [['createdAt', 'desc']],
    });
    return sendResponse(res, RESPONSE_CODE.HTTP_200_OK, { logs }, messages.SUCCESSFUL);
  } catch (e) {
    return sendResponse(res, RESPONSE_CODE.HTTP_400_BAD_REQUEST, {}, (e as Error).message);
  }
};
export const health = async (_req: Request, res: Response) => {
  const messages = (await getMessages(_req)) as MessagesTypes;
  try {
    return sendResponse(res, RESPONSE_CODE.HTTP_200_OK, {
      name: AppConfig.app.name,
      env: AppConfig.env,
      version: AppConfig.app.version,
      build: AppConfig.app.build,
      // redisConnected: redisClient.connected,
      // rabbitConnected: rabbitClient.connected,
    }, messages.SUCCESSFUL);
  } catch (e) {
    return sendResponse(res, RESPONSE_CODE.HTTP_400_BAD_REQUEST, {}, (e as Error).message);
  }
};

const recruiterHealthController = {
  test,
  health
};

export default recruiterHealthController;
