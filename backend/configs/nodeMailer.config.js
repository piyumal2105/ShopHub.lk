import nodemailer from "nodemailer";
import "dotenv/config";

export const mailConfigs = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.CLIENT_EMAIL,
      pass: process.env.CLIENT_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};
