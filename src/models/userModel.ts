import { Document, model, Model, Schema, SchemaType, Types } from "mongoose";
import { EMAIL_REGEX, FULL_NAME_REGEX, PWD_REGEX } from "../utils/regexs";

interface IUser extends Document {
    full_name: string;
    email: string;
    password: string;
    role: Number;
    score?: Number;
    deleted?: boolean;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
const UserSchema = new Schema<IUser>(
    {
        full_name: { type: String, required: true, match: FULL_NAME_REGEX },
        email: {
            type: String,
            required: true,
            unique: true,
            match: EMAIL_REGEX,
        },
        password: { type: String, required: true },
        role: { type: Number, required: true, ref: "Role" },
        score: { type: Number, default: 0 },
        deleted: { type: Boolean, default: false },
        active: { type: Boolean, default: false },
    },
    { timestamps: true, toJSON: { virtuals: true, versionKey: false }} ,
);

const UserModel = model<IUser>("User", UserSchema);
export { IUser, UserModel };
