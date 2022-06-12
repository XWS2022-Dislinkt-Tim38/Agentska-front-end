import { CommentModel } from "./comment";

export class InterviewModel{
    easyDifficultyCount?: number;
    mediumDifficultyCount?: number;
    hardDifficultyCount?: number;
    rating: number = 0;
    easyPercent?: number;
    mediumPercent?: number;
    hardPercent?: number;
    comments: Array<CommentModel> = new Array<CommentModel>();
}