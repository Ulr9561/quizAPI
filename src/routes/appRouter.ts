import express, { Router } from "express";
import { checkAuthAndAccount } from "../middlewares/authMiddleware";
import { categories, quizzes } from "../controllers/quizController";

const appRouter: Router = express.Router();


// appRouter.use(checkAuthAndAccount);

appRouter.get("/", (req, res) => {
    res.json({ message: "Hello, World!" });
});

appRouter.get('/quizzes/:categoryName', quizzes);
appRouter.get('/categories', categories)
export default appRouter;
