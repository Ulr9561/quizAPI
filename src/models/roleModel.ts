import { Document, model, Schema, Types } from "mongoose";

interface IRole extends Document {
    ref_id: number;
    name: string;
    privileges: string[];
}

const RoleSchema = new Schema<IRole>({
    ref_id: { type: Number, unique: true, required: true },
    name: { type: String, unique: true, required: true },
    privileges: { type: [String] },
});

const Role = model<IRole>("Role", RoleSchema);

export { Role, IRole };
