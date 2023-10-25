/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { RedisClient } from './RedisClient';
import AppConfig from './AppConfig';

const USER_DATA_KEY = 'user:';
export const EXP_24_HOUR = 24 * 60 * 60;
export const EXP_5_MINS = 5 * 60;
const DISABLE_CACHING = false;

export const cacheUserDataString = async (userId: string, key: string, value: string) => {
  if (DISABLE_CACHING) return;
  try {
    if (!value) return;
    const userDataKey = USER_DATA_KEY + userId;
    const client = RedisClient.getInstance();
    await client.hSet(userDataKey, key, value);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

export const cacheUserDataObject = async (userId: string, key: string, value: object) => {
  if (DISABLE_CACHING) return;
  try {
    if (!value) return;
    const str = JSON.stringify(value);
    await cacheUserDataString(userId, key, str);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

export const getUserDataStringFromCache = async (userId: string, key: string) => {
  if (DISABLE_CACHING) return undefined;
  try {
    const userDataKey = USER_DATA_KEY + userId;
    const client = RedisClient.getInstance();
    const data = await client.hGet(userDataKey, key);
    return data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
  return undefined;
};

export const getUserDataObjectFromCache = async (userId: string, key: string) => {
  if (DISABLE_CACHING) return undefined;
  try {
    const value = await getUserDataStringFromCache(userId, key);
    if (typeof value === 'string') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return JSON.parse(value);
    } else return {};
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
  return undefined;
};

export const deleteUserDataFromCache = async (userId: string, key: string) => {
  if (DISABLE_CACHING) return;
  try {
    const userDataKey = USER_DATA_KEY + userId;
    const client = RedisClient.getInstance();
    await client.hDel(userDataKey, key);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

export const cacheTempData = async (key: string, value: string | object, expiryInSeconds = EXP_24_HOUR) => {
  if (DISABLE_CACHING) return;
  try {
    const mKey = AppConfig.env + key;
    let data = value;
    if (!data) return;
    if (typeof value !== 'string') data = JSON.stringify(value);
    const client = RedisClient.getInstance();
    await client.setEx(mKey, expiryInSeconds, data as string);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

export const getTempDataFromCache = async (
  key: string,
  returnJson = false,
): Promise<string | object | undefined | null> => {
  if (DISABLE_CACHING) return undefined;
  const mKey = AppConfig.env + key;
  try {
    const client = RedisClient.getInstance();
    const data = await client.get(mKey);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return returnJson && data ? JSON.parse(data) : data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
  return undefined;
};

export const getTTL = async (key: string) => {
  if (DISABLE_CACHING) return 0;
  try {
    const mKey = AppConfig.env + key;
    const client = RedisClient.getInstance();
    const value = await client.ttl(mKey);
    return value;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
  return 0;
};
