import { Request, Response } from "express";
import { QuizModel } from "../models/quizModel";
import { Category } from "../models/categoryModel";
const quizzes = async (req: Request, res: Response) => {
    const { categoryName } = req.params;
    console.log(categoryName);
    try {
        const quizzes = await QuizModel.find({ category: categoryName }).exec();

        res.status(200).json({ quizzes });
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const categories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find().exec();
        res.status(200).json({ categories });
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export { quizzes, categories };
