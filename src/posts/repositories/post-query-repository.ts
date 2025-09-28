import {PaginationQueriesType} from "../../helpers/pagination_values";
import {ObjectId} from "mongodb";
import {PostDBType, PostDocument, PostModel} from "../../db/post-db-type";
import {OutputPostType} from "../../input-output-types/post-types";
import {OutputBlogType} from "../../input-output-types/blog-types";
import {SortMongoType} from "../../blogs/repositories/blogs-query-repository";
import {injectable} from "inversify";
import {LikeStatus} from "../../db/comment-db-type";
import {LikePostDocument, LikePostModel} from "../../db/like-post-db-type";

export const mapToOutputPost = (post: PostDocument, myStatus: LikeStatus = "None", last3likes: Array<LikePostDocument>): OutputPostType => {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        createdAt: post.createdAt,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        extendedLikesInfo: {
            likesCount: post.likesCount,
            dislikesCount: post.dislikesCount,
            myStatus: myStatus,
            newestLikes: last3likes.map(l => {
                return {
                    addedAt: l.createdAt,
                    login: l.login,
                    userId: l.userId
                }
            })
        }
    }
}

export type MapToOutputWithPagination = {
    "pagesCount": number,
    "page": number,
    "pageSize": number,
    "totalCount": number,
    "items": Array<OutputPostType> | Array<OutputBlogType>
}

@injectable()
export class PostsQueryRepository {
    async getAllPosts(query: PaginationQueriesType, userId?: string, blogId?: string): Promise<any> {
        const pageNumber = query.pageNumber
        const pageSize = query.pageSize
        const sortBy = query.sortBy
        const sortDirection = query.sortDirection === 'asc' ? 1 : -1
        const searchNameTerm = query.searchNameTerm
        let filter = {}
        if (searchNameTerm) {
            filter = {$regex: searchNameTerm, $option: 'i'}
        }
        if (blogId) {
            filter = {...filter, blogId}
        }
        const sortFilter: SortMongoType = {[sortBy]: sortDirection} as SortMongoType
        const posts = await PostModel
            .find(filter)
            .sort(sortFilter)
            .skip((pageNumber - 1) * pageSize)
            .limit(+pageSize)
            .lean().exec()

        const totalCount = await PostModel.countDocuments(filter)

        const userLikes = await LikePostModel.find({userId}).exec()

        const allLikes = await LikePostModel.find({myStatus: "Like"}).sort({ createdAt: -1 }).exec()


        return {
            pagesCount: Math.ceil(totalCount / query.pageSize),
            page: query.pageNumber,
            pageSize: query.pageSize,
            totalCount: totalCount,
            items: posts.map((post: PostDocument) => {
                const currentLike = userLikes?.find(like => like.postId === String(post._id))
                const last3likes = allLikes.filter(l => l.postId === String(post._id)).slice(0, 3)
                return mapToOutputPost(post, currentLike?.myStatus, last3likes)
            })
        }
    }

    async findPost(id: string, userId?: string): Promise<PostDBType | null> {
        const postId = new ObjectId(id)
        const post = await PostModel.findById(postId).exec()
        const likeStatus = userId ? await LikePostModel.findOne({userId, postId}).exec() : undefined
        const last3likes = await LikePostModel.find({postId, myStatus: "Like"}).sort({ createdAt: -1 }).limit(3).exec()
        console.log(last3likes)
        if (post) return mapToOutputPost(post, likeStatus?.myStatus, last3likes)
        return null
    }
}