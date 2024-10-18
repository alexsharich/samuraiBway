import {PaginationQueriesType} from "../../helpers/pagination_values";
import {postsCollection} from "../../repositories/DB";

export const postsQueryRepository = {
    async getPostsForSelectedBlog({blogId, query}: { blogId: string; query: PaginationQueriesType }): Promise<any> {

        try {
            const pageNumber = query.pageNumber
            const pageSize = query.pageSize
            const sortBy = query.sortBy
            const sortDirection = query.sortDirection
            const searchNameTerm = query.searchNameTerm
            let filter = {}
            if (searchNameTerm) {
                filter = {$regex: searchNameTerm, $option: 'i'}
            }
            return postsCollection.find(filter).skip((pageNumber - 1) * pageSize).limit(pageSize).sort({
                [sortBy]: sortDirection === 'asc' ? 1 : -1
            }).toArray()
        } catch (e) {
            console.log('Get posts for selected blog Error')
            return null
        }
    },
    getPostsForSelectedBlogCount(searchNameTerm: string) {
        let filter = {}
        if (searchNameTerm) {
            filter = {$regex: searchNameTerm, $option: 'i'}
        }
        return postsCollection.countDocuments(filter)
    }

}