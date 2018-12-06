import { CommentResponse } from "src/models/api/response/CommentResponse";

export class RatingUtility {
    private constructor() {
    }

    //get rating based on comments
    public static getRating(comments: CommentResponse[]): number {
        let rating  = 0;
        for (let i = 0; i < comments.length; i++) {
            rating += comments[i].rating;
        }

        if (comments.length > 0) {
            rating = rating/comments.length;
        } else {
            rating = 0;
        }

        return rating;
    }
}