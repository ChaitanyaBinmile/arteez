import {OtpConfig } from '../utils/ApiConstants';
import moment from 'moment';

function getNumericRandom(len = 6) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < len; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  export const otpValidate = (expiresAt:string)  => {
    try {
      const CurrentTime = moment().format('HH:mm:ss');
      const expiresDate = moment(expiresAt, 'HH:mm:ss').add(OtpConfig.expiresAt, 'minutes').format('HH:mm:ss');
      if (expiresDate >= CurrentTime) {
        return expiresDate;
      }
      return false;
    } catch (error) {
      return error;
    }
  };

  export const generateOtp = ()  => {
  try {
    const otp = getNumericRandom(6);
    return otp;
  } catch (error) {
    return error;
  }
};

module.exports = {
  generateOtp,
  otpValidate,
};
