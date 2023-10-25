export const API_RESPONSE_SUCCESS = '00000';
export const API_RESPONSE_FAIL = '000RF';
export const API_RC_ROUTE_NOT_FOUND = '00RNF';
export const ERROR_NO_TOKEN_PROVIDED = '00NTP';
export const ERROR_UNAUTHORIZED = '000UN';

export const AppHeaders = {
  X_USER_ID: 'x-user-id',
  X_CLIENT_ID: 'x-client-id',
  X_AUTH_KEY: 'x-auth-key',
};

export const RedisKeys = {
  JWT_TOKEN: 'jwt_token',
  REFRESH_TOKEN: 'refresh_token',
};

export const OtpConfig = {
  type: 'onBoarding',
  expiresAt: 5, // 5 minutes
};

export const UserStatus = {
  None: 0,
  Active: 1,
  SUSPENDED: 2,
  DELETED: 3,
};

export const LinkedAccountType = {
  None: 0,
  Google: 1,
  Facebook: 2,
  Apple: 3,
};

export const TemplatesEmail = {
  ONBOARDING_OTP: 'onboardingOtp',
};

export const ApiUrls = {
  todos: 'https://jsonplaceholder.typicode.com/todos',
};

export const RESPONSE_CODE = {
  HTTP_200_OK: 200,
  HTTP_201_CREATED: 201,
  HTTP_204_NO_CONTENT: 204,
  HTTP_203_NON_AUTHORITATIVE_INFO: 203,
  HTTP_304_NOT_MODIFIED: 304,
  HTTP_400_BAD_REQUEST: 400,
  HTTP_401_UNAUTHORIZED: 401,
  HTTP_403_FORBIDDEN: 403,
  HTTP_404_NOT_FOUND: 404,
  HTTP_409_CONFLICT: 409,
  HTTP_417_EXPECTATION_FAILED: 417,
  HTTP_500_INTERNAL_SERVER_ERROR: 500,
};

export const DEFAULT_NAME= 'others';
export const DEFAULT_VALUE= 0;
export const INITIAL_PAGE_NUM= 1;
export const MINIMUM_RECORD_NUM= 3;



