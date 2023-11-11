const crypto = require("crypto");

const hashService = require("./hash-service");

const smsSid = process.env.TWILIO_SMS_SID;
const smsToken = process.env.TWILIO_SMS_TOKEN;

const twilio = require("twilio")(smsSid, smsToken, {
  lazyLoading: true,
});

class OtpService {
  async generateOtp() {
    const otp = await crypto.randomInt(1000, 9999);
    return otp;
  }

  async sendBySms(phoneNumber, otp) {
    return await twilio.messages.create({
      to: phoneNumber,
      from: process.env.SMS_FROM_NUMBER,
      body: `Your coderHouse otp is ${otp}`,
    });
  }

  verifyOtp(hashedOtp, data) {
    const computedHash = hashService.hashOtp(data);
    return computedHash === hashedOtp ? true : false;
  }
}

module.exports = new OtpService();
