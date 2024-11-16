import {commentsRepository} from "../repositories/comments-repository";
import {commentsCollection, usersCollection} from "../../repositories/DB";

export const commentsService = {
    async deleteComment(id: string) {
        return await commentsRepository.deleteComment(id)
    },
    async updateComment({params, body}: any) {
        return await commentsRepository.updateComment({params, body})
    },
    async deleteAllComments(){
        return await commentsCollection.drop()
    }
}