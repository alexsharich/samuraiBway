import {LikeStatus} from "../db/comment-db-type";

export type OutputCommentType = {
    id: string,
    content: string,
    commentatorInfo: {
        userId: string,
        userLogin: string
    },
    likesInfo: {
        likesCount: number,
        dislikesCount: number,
        myStatus: LikeStatus
    }
    createdAt: string
}

export type InputCommentType = {
    content: string
}