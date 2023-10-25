import { Response } from 'express';
import { sendResponse } from '../../../lib/utils/JsonResponse';
import { RESPONSE_CODE } from '../../../lib/utils/ApiConstants';
import { getMessages } from '../../../lib/utils/languageHelper';
import { MessagesTypes } from '../../types/common/MessageDataType';
import { ExtendedRequest } from '../../types/user/UserDataType';
import { saveUserParams, findUserParams } from '../../types/message/UserDataType';
import messageService from '../../services/message/MessageService';

const saveUser = async (req: ExtendedRequest, res: Response) => {
  const messages = (await getMessages(req)) as MessagesTypes;
  try {
    const { email, password } = req.body as saveUserParams;
    await messageService.saveUser(email, password);

    return sendResponse(res, RESPONSE_CODE.HTTP_200_OK, {}, messages.SUCCESSFUL);
  } catch (e) {
    switch (e) {
      case 'INVALID_PAGE_NUMBER':
        return sendResponse(res, RESPONSE_CODE.HTTP_400_BAD_REQUEST, {}, messages.INVALID_PAGE_NUMBER);
      default:
        return sendResponse(res, RESPONSE_CODE.HTTP_400_BAD_REQUEST, {}, (e as Error).message);
    }
  }
};


const findUser = async (req: ExtendedRequest, res: Response) => {
  const messages = (await getMessages(req)) as MessagesTypes;
  try {
    const {
      limit,
      page_num,
    } = req.body as findUserParams;

    const result = (await messageService.findUsers(
      limit,
      page_num,
    )) as unknown as {  users_count: number; users: any[] };

    return sendResponse(res, RESPONSE_CODE.HTTP_200_OK, result, messages.FETCHED_SUCCESS);
  } catch (e) {
    switch (e) {
      case 'INVALID_PAGE_NUMBER':
        return sendResponse(res, RESPONSE_CODE.HTTP_400_BAD_REQUEST, {}, messages.INVALID_PAGE_NUMBER);
      default:
        return sendResponse(res, RESPONSE_CODE.HTTP_400_BAD_REQUEST, {}, (e as Error).message);
    }
  }
};



const messageController = {
  saveUser,
  findUser,
};

export default messageController;
