import nodemailer from "nodemailer";

const sendMail = async (to, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: import.meta.env.MAILTRAP_HOST,
      port: import.meta.env.MAILTRAP_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: import.meta.env.MAILTRAP_USERNAME,
        pass: import.meta.env.MAILTRAP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });
    "Message sent: %s", info.messageId, info;
    return info;
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export default sendMail;
