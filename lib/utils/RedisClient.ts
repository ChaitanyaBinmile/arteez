import { RedisClientType, createClient } from 'redis';
import Logger from './Logger';
import AppConfig from './AppConfig';

const TAG = 'RedisClient:';

export class RedisClient {
  // eslint-disable-next-line no-use-before-define
  private static instance: RedisClient;
  private client: RedisClientType;

  /**
   * The RedisClient's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    // https://github.com/redis/node-redis/blob/master/docs/client-configuration.md

    this.client = createClient({
      socket: {
        host: AppConfig.redis.host,
        port: AppConfig.redis.port,
      },
    });

    void this.client.connect().then(() => {
      Logger.log(TAG, 'Redis client connected');
    });

    this.client.on('error', (err) => {
      Logger.log(TAG, 'Error' + (err as Error).message);
    });
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the RedisClient class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): RedisClientType {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance.client;
  }
}
