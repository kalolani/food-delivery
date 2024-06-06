import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // Send email using SendGrid
  try {
    await transporter.sendMail({
      to: "kkaleabseven@gmail.com", // Receiver email address
      from: process.env.SENDGRID_VERIFIED_EMAIL, // Your SendGrid verified email
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    res
      .status(200)
      .json({ message: "Email sent successfully using SendGrid!" });
  } catch (error) {
    console.error("SendGrid error", error);
    res.status(500).json({
      message: `Failed to send email using SendGrid: ${error.message}`,
    });
  }
};

export { sendEmail };
