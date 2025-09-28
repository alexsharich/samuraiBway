import {LikeStatus} from "../db/comment-db-type";

type NewsLikeInfo = {

    addedAt: string,
    userId: string,
    login: string

}
export type OutputPostType = {
    id: string,
    title: string,
    shortDescription: string,
    createdAt: string,
    content: string,
    blogId: string,
    blogName: string,
    extendedLikesInfo: {
        likesCount: number,
        dislikesCount: number,
        myStatus: LikeStatus,
        newestLikes?: NewsLikeInfo[]
    }
}


export type InputPostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
}

export type InputPostForBlogType = {
    title: string,
    shortDescription: string,
    content: string,
}