import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import Hash from "../utils/hash";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import {
    generateEmailToken,
    sendVerificationEmail,
} from "../services/auth/emailVerification";
import { AuthRequest, User } from "../types";

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).exec();

    if (user?.active === false) {
        return res.status(401).json({ message: "Email not verified" });
    }
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await Hash.verify(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY || "secret",
        { expiresIn: "5h" },
    );
    return res.status(200).json({
        token: token,
        message: "Login successful",
    });
};

const register = async (req: Request, res: Response) => {
    try {
        const { full_name, email, password } = req.body;
        const pwd = await Hash.hash(password);
        const user = await UserModel.create({
            full_name: full_name,
            email,
            password: pwd,
            role: 485,
            active: false,
        });

        console.log(user);
        const token = generateEmailToken(user.id);
        sendVerificationEmail(token, user.email);

        return res.status(201).json({
            message:
                "Registration successful. Please verify your email for activate your account !",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;

        const secret = process.env.EMAIL_SECRET_KEY || "secret";
        const decode = jwt.verify(token, secret) as { user_id: string };

        const user = await UserModel.findById(decode.user_id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.active = true;
        await user.save();

        res.status(200).json({
            message: "Email verified successfully! You can now login !",
        });
    } catch (err) {
        console.error(err);
        if (err as JsonWebTokenError) {
            return res
                .status(401)
                .json({ message: "Invalid or expired token" });
        }
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const user = async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    if (req.user) {
        const user: User = {
            full_name: req.user.full_name,
            email: req.user.email,
            role: req.user.role,
            active: req.user.active,
            createdAt: req.user.createdAt,
            updatedAt: req.user.updatedAt,
        };
        return res.status(200).json({ user: user });
    }

    try {
        const user = await UserModel.findById(userId).exec();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const filteredUser: User = {
            full_name: user.full_name,
            email: user.email,
            role: user.role,
            active: user.active,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        return res.status(200).json({ user: filteredUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export { login, register, verifyEmail, user };
