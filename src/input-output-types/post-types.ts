export type OutputPostType = {
    id: string,
    title: string,
    shortDescription: string,
    createdAt:string,
    content: string,
    blogId: string,
    blogName: string
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