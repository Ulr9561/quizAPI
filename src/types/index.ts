import { Request } from "express";
import { IUser } from "../models/userModel";
import { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: IUser;
    token?: string | JwtPayload;
    userId?: string;
}

export interface User {
    full_name: string;
    email: string;
    role: Number;
    score?: Number;
    deleted?: boolean;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

