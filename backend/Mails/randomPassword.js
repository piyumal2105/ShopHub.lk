import mailgen from "mailgen";
import "dotenv/config";
import { mailConfigs } from "../configs/nodeMailer.config.js";

export const sendRandomPassword = async ({
  username,
  userEmail,
  randomPassword,
}) => {
  //import mail configs
  let mailTransporter = mailConfigs();

  let MailGenerator = new mailgen({
    theme: "cerberus",
    product: {
      name: "ShopHub.lk",
      link: "http://localhost:5173/",
      logoHeight: "80px",
    },
  });

  var email = {
    body: {
      name: `${username}`,
      intro: `Welcome to ShopHub.lk`,
      text: `Now you are a shop member of the ShopHub.lk`,
      action: {
        instructions: `<h1>${randomPassword}</h1>`,
        button: {
          color: "#22BC66",
          text: "Login to your account",
          link: "http://localhost:5173/user/login",
        },
      },
    },
    layout: "full-width",
  };

  //convert mailgen body into HTML
  let emailBody = MailGenerator.generate(email);
  let emailText = MailGenerator.generatePlaintext(email);

  //sending credentials
  let details = {
    from: process.env.CLIENT_EMAIL,
    to: `${userEmail}`,
    subject: `Profile credentials`,
    html: emailBody,
    text: emailText,
  };

  //send mail through nodemailer
  await mailTransporter
    .sendMail(details)
    .then((data) => {
      console.log("Mail sent successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error sending mail:", error);
      throw error; // This line ensures that the error is propagated
    });
};
