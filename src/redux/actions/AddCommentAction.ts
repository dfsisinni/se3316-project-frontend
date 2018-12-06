import { CommentResponse } from "src/models/api/response/CommentResponse";

export interface AddCommentAction {
    comment: CommentResponse;
    itemId: string;
}