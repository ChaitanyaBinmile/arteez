/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import Logger from './Logger';

const TAG = 'EmailManager: ';

const config = {
  service: process.env.SMTP_SERVICE,
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  },
};

export const sendEmail = (email: string, subject: string, template: string,data:any) => {
  try {
    ejs.renderFile(path.join(__dirname, '..', 'templates/' + template) + '.ejs', { data }, (err: any, data) => {
      if (!err) {
        const configData = {
          'from': process.env.NO_REPLY,
          'to': email,
          'subject': subject,
          'html': data
        };
        const transporter = nodemailer.createTransport(config);
        transporter.sendMail(configData, (err: any, info: { response: any; }) => {
          if (err) {
            Logger.log(TAG, err);
          } else {
            Logger.log(TAG, info.response);
          }

        });
      } else { Logger.log(TAG, err); }
    });
  } catch (error) {
    return error;
  }
};