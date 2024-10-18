export {Request} from 'express'

export type SortType = 'desc' | 'asc'
export type PaginationQueriesType ={
     pageNumber  : number
     pageSize : number
     sortBy  : string
     sortDirection: SortType
     searchNameTerm : string | null
}
export const paginationQueries = (query:PaginationQueriesType) => {//fix type
    const pageNumber = query.pageNumber ? +query.pageNumber : 1
    const pageSize = query.pageSize ? +query.pageSize : 10
    const sortBy = query.sortBy ? query.sortBy.toString() : 'createdAt'
    const sortDirection: SortType = query.sortDirection && query.sortDirection === 'asc' ? 'asc' : 'desc'
    const searchNameTerm = query.searchNameTerm ? query.searchNameTerm.toString() : null

    return {pageNumber, pageSize, sortBy, sortDirection, searchNameTerm}
}