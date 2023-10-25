import { Request, Response, NextFunction } from 'express';
import { RESPONSE_CODE } from '../../lib/utils/ApiConstants';
import AppConfig from '../../lib/utils/AppConfig';
import { sendResponse } from '../../lib/utils/JsonResponse';
import { getMessages } from '../../lib/utils/languageHelper';
import { tokenVerify } from '../../lib/utils/jwtHelper';
import { MessagesTypes } from '../types/common/MessageDataType';

import { userInfoObj, ExtendedRequest } from '../types/user/UserDataType';
import UserModel from './../models/UserModel';
function isTokenPresentInHeader(req: Request) {
  const header = req.headers.authorization;
  if (!header) throw new Error('no token provided.');
  return header;
}
function isClientTokenPresentInHeader(req: Request) {
  const header = req.headers.client_secret;

  if (!header) throw new Error('client secret not provided.');
  return header;
}
function getTokenFromHeader(header: string) {
  const bearer = header.split(' ');
  if (bearer.length < 2) throw new Error('invalid token');
  return bearer[1];
}
export const authorizeAnonymous = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Retrieve localized messages
    const messages = (await getMessages(req)) as MessagesTypes;
    // Check if the token is present in the request header
    const clientSecret = isClientTokenPresentInHeader(req);
    if (AppConfig.ANONYMOUS.CLIENT_SECRET === clientSecret) {
      return next();
    } else {
      return sendResponse(res, RESPONSE_CODE.HTTP_401_UNAUTHORIZED, {}, messages.FAILED_TO_AUTHENTICATE);
    }
  } catch (e) {
    console.log('Error', (e as Error).message);
    // Handle any exceptions that occurred during the verification process
    return sendResponse(res, RESPONSE_CODE.HTTP_403_FORBIDDEN, {}, (e as Error).message);
  }
};
export const authorizeUser = (role_id: number) => {
  return async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      // Retrieve localized messages
      const messages = (await getMessages(req)) as MessagesTypes;
      // Check if the token is present in the request header
      const header = isTokenPresentInHeader(req);
      // Extract the token from the header
      const token = getTokenFromHeader(header);

      // Verify the token's validity
      tokenVerify(token)
        .then(async (decode) => {
          // Destructure the job update payload from the request body
          const { userId } = decode as userInfoObj;

          const findCondition = {
            where: {
              id: userId,
              role_id,
            },
            attributes: ['id', 'is_deleted', 'is_active', 'industry_id', 'org_id', 'deptt_id', 'sub_deptt_id', 'country', 'state', 'city'],
          };
          const userInfo = await UserModel.findOne(findCondition);
          if (userInfo) {
            if (userInfo.is_deleted) {
              return sendResponse(res, RESPONSE_CODE.HTTP_401_UNAUTHORIZED, {}, messages.USER_ACCOUNT_DELETED);
            } else if (!userInfo.is_active) {
              return sendResponse(res, RESPONSE_CODE.HTTP_401_UNAUTHORIZED, {}, messages.USER_ACCOUNT_BLOCKED);
            } else {
              req.user = userInfo;
              return next();
            }
          } else {
            return sendResponse(res, RESPONSE_CODE.HTTP_401_UNAUTHORIZED, {}, messages.USER_NOT_FOUND);
          }
        })
        .catch((e) => {
          switch ((e as Error).name) {
            case 'TokenExpiredError':
              // Handle token expiration error
              return sendResponse(res, RESPONSE_CODE.HTTP_401_UNAUTHORIZED, {}, messages.ACCESS_TOKEN_EXPIRED);
              break;
            default:
              // Handle other token verification errors
              return sendResponse(res, RESPONSE_CODE.HTTP_401_UNAUTHORIZED, {}, (e as Error).message);
              break;
          }
        });
    } catch (e) {
      // Handle any exceptions that occurred during the verification process
      return sendResponse(res, 403, {}, (e as Error).message);
    }
  };
};
export const authorizeMultiRoleUser = (allowedRoles: number[]) => {
  return async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      // Retrieve localized messages
      const messages = (await getMessages(req)) as MessagesTypes;
      // Check if the token is present in the request header
      const header = isTokenPresentInHeader(req);
      // Extract the token from the header
      const token = getTokenFromHeader(header);

      // Verify the token's validity
      tokenVerify(token)
        .then(async (decode) => {
          // Destructure the job update payload from the request body
          const { userId } = decode as userInfoObj;

          const findCondition = {
            where: {
              id: userId,
              role_id: allowedRoles,
            },
            attributes: ['id', 'is_deleted', 'is_active', 'industry_id', 'org_id', 'deptt_id', 'sub_deptt_id', 'country', 'state', 'city'],
          };
          const userInfo = await UserModel.findOne(findCondition);
          if (userInfo) {
            if (userInfo.is_deleted) {
              return sendResponse(res, RESPONSE_CODE.HTTP_401_UNAUTHORIZED, {}, messages.USER_ACCOUNT_DELETED);
            } else if (!userInfo.is_active) {
              return sendResponse(res, RESPONSE_CODE.HTTP_401_UNAUTHORIZED, {}, messages.USER_ACCOUNT_BLOCKED);
            } else {
              req.user = userInfo;
              return next();
            }
          } else {
            return sendResponse(res, RESPONSE_CODE.HTTP_401_UNAUTHORIZED, {}, messages.USER_NOT_FOUND);
          }
        })
        .catch((e) => {
          switch ((e as Error).name) {
            case 'TokenExpiredError':
              // Handle token expiration error
              return sendResponse(res, RESPONSE_CODE.HTTP_401_UNAUTHORIZED, {}, messages.ACCESS_TOKEN_EXPIRED);
              break;
            default:
              // Handle other token verification errors
              return sendResponse(res, RESPONSE_CODE.HTTP_401_UNAUTHORIZED, {}, (e as Error).message);
              break;
          }
        });
    } catch (e) {
      // Handle any exceptions that occurred during the verification process
      return sendResponse(res, 403, {}, (e as Error).message);
    }
  };
};

