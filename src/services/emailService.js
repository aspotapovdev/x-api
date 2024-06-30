const transporter = require('../config/emailConfig');

class EmailService {
  async sendVerificationEmail(user, token) {
    const verificationUrl = `${process.env.CLIENT_URL}/confirm-email?token=${token}`;
    const mailOptions = {
      from: 'anderpo@yandex.ru',
      to: user.email,
      subject: 'Email Verification',
      text: `Please confirm your email by clicking the following link: ${verificationUrl}`,
      html: `<p>Please confirm your email by clicking the following link: <a href="${verificationUrl}">${verificationUrl}</a></p>`,
    };

    return transporter.sendMail(mailOptions);
  }
}

module.exports = new EmailService();
