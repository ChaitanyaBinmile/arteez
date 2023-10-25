/* eslint-disable  no-console */
import AppConfig from './AppConfig';
import Logger from './Logger';
import * as amqplib from 'amqplib';
import { Channel, Connection } from 'amqplib';
// import { initPushQueue } from '../controllers/ControllerFirebaseNotification';

const TAG = 'RabbitMqClient:';

export class RabbitMqClient {
  // eslint-disable-next-line no-use-before-define
  private static instance: RabbitMqClient;
  private connection!: Connection;
  private defaultChannel!: Channel;
  private connected!: boolean;

  constructor() {
    Logger.log(TAG, 'Creating rabbit mq new connection...');
    const options = {
      protocol: 'amqp',
      hostname: AppConfig.rabbitMq.host,
      port: parseInt(AppConfig.rabbitMq.port),
      username: AppConfig.rabbitMq.username,
      password: AppConfig.rabbitMq.password,
      heartbeat: 60,
    };
    amqplib
      .connect(options)
      .then((connection) => {
        this.connection = connection;
        void connection.createChannel().then((channel) => {
          Logger.log(TAG, 'Created default channel');
          this.defaultChannel = channel;
          // void initPushQueue().then(() => Logger.log(TAG, 'initialised push queue'));
          this.connected = true;
        });
      })
      .catch((e) => {
        console.error(e);
        this.connected = false;
      });
  }

  /**
   * The static method that controls the access to the singleton instance.
   * This implementation let you subclass the RabbitMqClient class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): RabbitMqClient {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!RabbitMqClient.instance) {
      RabbitMqClient.instance = new RabbitMqClient();
    }
    return RabbitMqClient.instance;
  }

  public getDefaultChannel(): Channel {
    return this.defaultChannel;
  }

  public getConnection(): Connection {
    return this.connection;
  }

  public isConnected(): boolean {
    return this.connected;
  }
}

export default new RabbitMqClient();
