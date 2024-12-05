import { Category } from "../models/categoryModel";
import mongoose from "mongoose";

const updateDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/quizDB");
        const categories = await Category.find({}).exec();

        const updates = categories.map(async (category) => {
            let updated = false;

            switch (category.title) {
                case "Jeux de mots":
                    category.description =
                        "Amusez-vous avec des jeux de mots, des calembours et des énigmes linguistiques. Idéal pour les amateurs de jeux de mots et les passionnés de langue.";
                    category.icon = "font";
                    category.color = "#8E24AA";
                    updated = true;
                    break;
                case "Devinettes":
                    category.description =
                        "Testez votre esprit avec des devinettes intrigantes et amusantes. Un challenge parfait pour ceux qui aiment les mystères et les énigmes.";
                    category.icon = "question";
                    category.color = "#FFEB3B";
                    updated = true;
                    break;
                default:
                    break;
            }
            if (updated) {
                await category.save();
                console.log(`Catégorie mise à jour : ${category.title}`);
            }
        });

        await Promise.all(updates);



        console.log("Mise à jour des catégories terminée.");
        mongoose.disconnect();
    } catch (error) {
        console.error("Erreur lors de la mise à jour des catégories:", error);
    }
};

export default updateDb;
