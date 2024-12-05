import mongoose, { Schema, Document } from "mongoose";

interface ISubcategory extends Document {
    name: string;
    tags: string[];
}

const SubcategorySchema: Schema<ISubcategory> = new Schema({
    name: { type: String, required: true },
    tags: [{ type: String, required: true }],
});

interface ICategory extends Document {
    title: string;
    description: string;
    icon: any;
    color: string;
    subcategories: ISubcategory[];
}

const CategorySchema: Schema<ICategory> = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },
    color: { type: String, required: true },
    subcategories: [SubcategorySchema],
});

const Category = mongoose.model<ICategory>("Category", CategorySchema);

export { Category, ICategory, ISubcategory };
