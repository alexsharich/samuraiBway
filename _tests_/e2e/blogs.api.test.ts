import {DB, setDB} from "../../src/db/db";
import {InputBlogType} from "../../src/input-output-types/blog-types";
import {SETTINGS} from "../../src/settings";
import {agent} from 'supertest'
import {app} from "../../src/app";
import {codedAuth, createString, dataset1} from "../helpers/helpers";

const req = agent(app)

describe('/blogs', () => {
    beforeAll(async () => { // очистка базы данных перед началом тестирования
        await req.delete(SETTINGS.PATH.TEST)
    })

    it('should create', async () => {
        setDB()
        const newBlog: InputBlogType = {
            name: 'n1',
            description: 'd1',
            websiteUrl: 'http://some.com',
        }

        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(newBlog)
            .expect(201)


        expect(res.body.name).toEqual(newBlog.name)
        expect(res.body.description).toEqual(newBlog.description)
        expect(res.body.websiteUrl).toEqual(newBlog.websiteUrl)
        expect(typeof res.body.id).toEqual('string')

        expect(res.body).toEqual(DB.blogs[0])
    })
    it('shouldn\'t create 401', async () => {
        setDB()
        const newBlog: InputBlogType = {
            name: 'n1',
            description: 'd1',
            websiteUrl: 'http://some.com',
        }

        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .send(newBlog)
            .expect(401)


        expect(DB.blogs.length).toEqual(0)
    })
    it('shouldn\'t create', async () => {
        setDB()
        const newBlog: InputBlogType = {
            name: createString(16),
            description: createString(501),
            websiteUrl: createString(101),
        }

        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(newBlog)
            .expect(400)


        expect(res.body.errorsMessages.length).toEqual(3)
        expect(res.body.errorsMessages[0].field).toEqual('name')
        expect(res.body.errorsMessages[1].field).toEqual('description')
        expect(res.body.errorsMessages[2].field).toEqual('websiteUrl')

        expect(DB.blogs.length).toEqual(0)
    })
    it('should get empty array', async () => {
        setDB()
        const res = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200)


        expect(res.body.length).toEqual(0)
    })
    it('should get not empty array', async () => {
        setDB(dataset1)

        const res = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200)


        expect(res.body.length).toEqual(1)
        expect(res.body[0]).toEqual(dataset1.blogs[0])
    })
    it('shouldn\'t find', async () => {
        setDB(dataset1)

        const res = await req
            .get(SETTINGS.PATH.BLOGS + '/1')
            .expect(404)

    })
    it('should find', async () => {
        setDB(dataset1)

        const res = await req
            .get(SETTINGS.PATH.BLOGS + '/' + dataset1.blogs[0].id)
            .expect(200)


        expect(res.body).toEqual(dataset1.blogs[0])
    })
    it('should del', async () => {
        setDB(dataset1)

        const res = await req
            .delete(SETTINGS.PATH.BLOGS + '/' + dataset1.blogs[0].id)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(204)


        expect(DB.blogs.length).toEqual(0)
    })
    it('shouldn\'t del', async () => {
        setDB()
        const res = await req
            .delete(SETTINGS.PATH.BLOGS + '/1')
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(404)

    })
    it('shouldn\'t del 401', async () => {
        setDB()
        const res = await req
            .delete(SETTINGS.PATH.BLOGS + '/1')
            .set({'Authorization': 'Basic' + codedAuth}) // no ' '
            .expect(401)

    })
    it('should update', async () => {
        setDB(dataset1)
        const blog: InputBlogType = {
            name: 'n2',
            description: 'd2',
            websiteUrl: 'http://some2.com',
        }

        const res = await req
            .put(SETTINGS.PATH.BLOGS + '/' + dataset1.blogs[0].id)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(blog)
            .expect(204)


        expect(DB.blogs[0]).toEqual({...DB.blogs[0], ...blog})
    })
    it('shouldn\'t update 404', async () => {
        setDB()
        const blog: InputBlogType = {
            name: 'n1',
            description: 'd1',
            websiteUrl: 'http://some.com',
        }

        const res = await req
            .put(SETTINGS.PATH.BLOGS + '/1')
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(blog)
            .expect(404)

    })
    it.skip('shouldn\'t update2', async () => {
        setDB(dataset1)
        const blog: InputBlogType = {
            name: createString(16),
            description: createString(501),
            websiteUrl: createString(101),
        }

        const res = await req
            .put(SETTINGS.PATH.BLOGS + '/' + dataset1.blogs[0].id)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(blog)
            .expect(400)


        expect(DB).toEqual(dataset1)
        expect(res.body.errorsMessages.length).toEqual(3)
        expect(res.body.errorsMessages[0].field).toEqual('name')
        expect(res.body.errorsMessages[1].field).toEqual('description')
        expect(res.body.errorsMessages[2].field).toEqual('websiteUrl')
    })
    it.skip('shouldn\'t update 401', async () => {
        setDB(dataset1)
        const blog: InputBlogType = {
            name: createString(16),
            description: createString(501),
            websiteUrl: createString(101),
        }

        const res = await req
            .put(SETTINGS.PATH.BLOGS + '/' + dataset1.blogs[0].id)
            .set({'Authorization': 'Basic ' + codedAuth + 'error'})
            .send(blog)
            .expect(401)


        expect(DB).toEqual(dataset1)
    })
})