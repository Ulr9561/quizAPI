import { NextFunction, Request, Response } from "express";
import { EMAIL_REGEX, FULL_NAME_REGEX, PWD_REGEX } from "../utils/regexs";
import { UserModel } from "../models/userModel";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { AuthRequest } from "../types";

const validateRegisterRequest = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { full_name, email, password, confirmPassword } = req.body;

    if (!full_name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required." });
    } else if (
        Array.isArray(full_name) ||
        Array.isArray(email) ||
        Array.isArray(password)
    ) {
        return res.status(400).json({
            message:
                "Invalid data type for name, email or password! It must be unique",
        });
    }
    if (!FULL_NAME_REGEX.test(full_name)) {
        return res.status(400).json({ message: "Invalid full name format" });
    } else if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
    } else if (!PWD_REGEX.test(password)) {
        return res.status(400).json({ message: "Invalid password format." });
    } else if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

    try {
        const user1 = await UserModel.findOne({ email: email });
        const user2 = await UserModel.findOne({ full_name: full_name });

        if (user1) {
            return res.status(400).json({ message: "Email already exists." });
        } else if (user2) {
            return res
                .status(400)
                .json({ message: "Full name already exists." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    next();
};

const validateLoginRequest = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Email and password are required." });
    }
    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
    } else if (!PWD_REGEX.test(password)) {
        return res.status(400).json({ message: "Invalid password format." });
    }

    next();
};

const checkAuthAndAccount = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const secret = process.env.JWT_SECRET_KEY || "secret";
    const token = req.header("Authorization");

    if (!token || !token.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "Authorization token not provided!" });
    }

    try {
        const authToken = token.split(" ")[1];
        const decoded = jwt.verify(authToken, secret) as { userId: string, exp: number };

        req.token = Object.keys(decoded).values();
        req.userId = decoded.userId;

        const user = await UserModel.findById(decoded.userId);
        if (!user) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        if (user.active === false) {
            req.user = user;
            return res.status(403).json({ message: "Account not activated" });
        }

        next();
    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
            console.log(err);
            return res.status(401).json({ message: "Token expired" });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(400).json({ message: 'Invalid Token' });
        }
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export { validateLoginRequest, validateRegisterRequest, checkAuthAndAccount };
