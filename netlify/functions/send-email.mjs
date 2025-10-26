import nodemailer from "nodemailer";

export function handler(event) {

  const bodyString = event.isBase64Encoded
    ? Buffer.from(event.body, "base64").toString("utf8")
    : event.body;

  const { name, email, subject, message } = JSON.parse(bodyString);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: process.env.RECEIVING_EMAIL,
      subject,
      text: `Correo: ${email}. Mensaje: ${message}`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Email enviado correctamente" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
}