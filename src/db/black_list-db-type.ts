import {WithId} from "mongodb";

export type BlackListDBType = WithId<{
    oldRefreshTokens: Array<string>
}>