import { Category } from "../models/categoryModel";
import { Role } from "../models/roleModel";
import mongoose, { connect } from "mongoose";
import fs from "fs";
async function initializeRoles() {
    const roles = [
        { ref_id: 485, name: "user", privileges: ["basic_access"] },
        {
            ref_id: 958,
            name: "admin",
            privileges: ["admin_access", "manage_users"],
        },
        { ref_id: 205, name: "guest", privileges: ["guest_access"] },
    ];

    for (const role of roles) {
        const existingRole = await Role.findOne({ ref_id: role.ref_id });
        if (!existingRole) {
            await Role.create(role);
        }
    }
}

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/quizDB");
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
};

/*async function insertCategories() {
    const data = JSON.parse(fs.readFileSync("categories.json", "utf-8"));
    for (const categoryData of data.categories) {
        const category = new Category({
            title: categoryData.title,
            subcategories: categoryData.subcategories.map((subcat: any) => ({
                name: subcat.name,
                tags: subcat.tags,
            })),
        });

        try {
            await category.save();
            console.log(`Category "${category.title}" inserted successfully`);
        } catch (error) {
            console.error(
                `Error inserting category "${category.title}":`,
                error,
            );
        }
    }
}*/

export {connectDB};
