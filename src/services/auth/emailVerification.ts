import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";


const generateEmailToken = (user_id: string) => {
    const secret = process.env.EMAIL_SECRET_KEY || "secret";
    const token = jwt.sign({ user_id: user_id }, secret, { expiresIn: "1h" });
    return token;
};

const sendVerificationEmail = (token: string, email: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: "vallie.murray6@ethereal.email",
            pass: "udRkKXGG3rzqM5vX9U",
        },
    });

    const verificationLink = `http://localhost:8000/api/auth/verify/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email Verification",
        html: `<p>Please verify your email by clicking the link below:</p><a href="${verificationLink}">Verify Email</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Verification email sent:", info.response);
        }
    });
};

export { sendVerificationEmail, generateEmailToken };
