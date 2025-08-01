import {UserDocument, UserModel} from "../../db/user-db-type";
import {OutputUserType} from "../../input-output-types/userType";
import {PaginationQueriesUsersType} from "../../helpers/pagination_values";
import {SortMongoType} from "../../blogs/repositories/blogs-query-repository";
import {injectable} from "inversify";

const mapToOutputUser = (user: UserDocument): OutputUserType => {
    return {
        id: user._id.toString(),
        login: user.accountData.userName,
        email: user.accountData.email,
        createdAt: user.accountData.createdAt
    }
}

interface UserFilter {
    $or?: Array<{ [key: string]: any }>
}

@injectable()
export class UsersQueryRepository {
    async findUser(id: string): Promise<OutputUserType | null> {
        const user = await UserModel.findById(id).exec()
        if (!user) {
            return null
        }
        return mapToOutputUser(user)
    }

    async findUserByRecoveryCode(passwordRecovery: string) {
        return UserModel.findOne({passwordRecovery}).exec()
    }

    async getUsers(query: PaginationQueriesUsersType) {
        const pageNumber = query.pageNumber
        const pageSize = query.pageSize
        const sortBy = query.sortBy
        const sortDirection = query.sortDirection === 'asc' ? 1 : -1
        const searchLoginTerm = query.searchLoginTerm
        const searchEmailTerm = query.searchEmailTerm

        let filter: UserFilter = {}

        if (searchLoginTerm || searchEmailTerm) {
            filter = {
                $or: []
            };

            if (searchLoginTerm) {
                filter.$or?.push({login: {$regex: searchLoginTerm, $options: 'i'}});
            }
            if (searchEmailTerm) {
                filter.$or?.push({email: {$regex: searchEmailTerm, $options: 'i'}});
            }
        }

        const sortFilter: SortMongoType = {[sortBy]: sortDirection} as SortMongoType

        const users = await UserModel.find(filter)
            .sort(sortFilter)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .exec()

        const totalCount = await UserModel.countDocuments(filter).exec()
        return {
            pagesCount: Math.ceil(totalCount / query.pageSize),
            page: query.pageNumber,
            pageSize: query.pageSize,
            totalCount: totalCount,
            items: users.map((user: UserDocument) => mapToOutputUser(user))
        }
    }
}