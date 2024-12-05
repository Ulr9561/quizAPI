import { model, Schema } from "mongoose";


interface IQuestion extends Document {
    question: string;
    answers: string[];
    correctAnswerIndex: number;
    explanation: string
}
interface IQuiz extends Document {
    quizName: string;
    category: string;
    level: string;
    duration: number;
    questionsNumber: number;
    tags: string[];
    questions: IQuestion[];
}


const QuestionSchema = new Schema<IQuestion>({
    question: { type: String, required: true },
    answers: [{ type: [String], required: true }],
    correctAnswerIndex: { type: Number, required: true, min: 0, max: 3 },
    explanation: { type: String, required: true },
});

const QuizSchema = new Schema<IQuiz>({
    quizName: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, required: true },
    duration: { type: Number, required: true, min: 0 },
    questionsNumber: { type: Number, required: true, min: 1 },
    tags: [{ type: String }],
    questions: [QuestionSchema],
});

const QuizModel = model<IQuiz>('Quiz', QuizSchema);

export { IQuiz, IQuestion, QuizModel };
