import { CommentResponse } from "./api/response/CommentResponse";

export interface ItemWithRating {
    id: string,
    name: string;
    description: string;
    quantity: number;
    price: number;
    comments: CommentResponse[];
    rating: number;
}