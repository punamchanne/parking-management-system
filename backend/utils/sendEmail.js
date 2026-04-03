
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App password
    },
  });

  const mailOptions = {
    from: `"Smart Parking Admin" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #e74c3c;">🚨 Parking Violation Notification</h2>
        <p>Dear Vehicle Owner <strong>(${options.vehicle_number})</strong>,</p>
        <p style="font-size: 1.1em;">${options.message}</p>
        <div style="background: #f8f9fa; padding: 10px; margin: 20px 0; border-left: 5px solid #e74c3c;">
          <h3 style="margin: 0; color: #333;">Violation Type: Overcapacity Fine</h3>
          <p style="margin: 5px 0;">Vehicle Number: <strong>${options.vehicle_number}</strong></p>
          <p style="margin: 5px 0;">Fine Amount: <strong>₹500.00</strong></p>
        </div>
        <p style="color: #7f8c8d;">Please ensure you park correctly to avoid further fines.</p>
        <hr/>
        <p style="font-size: 0.8em; color: #95a5a6;">This is an automated system-generated email. Do not reply.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
