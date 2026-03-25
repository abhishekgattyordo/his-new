// lib/email.ts
import nodemailer from 'nodemailer';

// Configure your email service (example using Gmail)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendPasswordEmail(to: string, password: string, name: string) {
  const subject = 'Your Ordo HIS Account Password';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2c7a47;">Welcome to Ordo HIS!</h2>
      <p>Hello ${name},</p>
      <p>Your account has been successfully created. You can now log in to the patient portal using the following password:</p>
      <div style="background-color: #f0f0f0; padding: 12px; border-radius: 8px; font-size: 18px; font-weight: bold; text-align: center;">
        ${password}
      </div>
      <p>Please log in and change your password immediately for security.</p>
      <p>Your email is your username: <strong>${to}</strong></p>
      <p style="margin-top: 20px;">If you didn't request this, please ignore this email.</p>
      <hr />
      <p style="font-size: 12px; color: #666;">Ordo Healthcare Information System</p>
    </div>
  `;

  // If in development, just log the password and skip sending
  if (process.env.NODE_ENV === 'development') {
    console.log('📧 [DEV] Password email would be sent to:', to);
    console.log('🔑 Generated password:', password);
    return;
  }

  await transporter.sendMail({
    from: `"Ordo HIS" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}

export async function sendPasswordResetEmail(to: string, resetLink: string, name: string) {
  const subject = 'Reset Your Password – Ordo HIS';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2c7a47;">Reset Your Password</h2>
      <p>Hello ${name},</p>
      <p>We received a request to reset your password. Click the link below to set a new password:</p>
      <div style="background-color: #f0f0f0; padding: 12px; border-radius: 8px; text-align: center;">
        <a href="${resetLink}" style="color: #2c7a47; font-size: 18px; font-weight: bold;">Reset Password</a>
      </div>
      <p>This link expires in 1 hour. If you didn't request this, please ignore this email.</p>
      <hr />
      <p style="font-size: 12px; color: #666;">Ordo Healthcare Information System</p>
    </div>
  `;

  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.log('📧 [DEV] Password reset email would be sent to:', to);
    console.log('🔗 Reset link:', resetLink);
    return;
  }

  await transporter.sendMail({
    from: `"Ordo HIS" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}