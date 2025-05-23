import {DB, setDB} from "../../src/db/db";
import {SETTINGS} from "../../src/settings";
import {agent} from 'supertest'
import {app} from "../../src/app";
import {codedAuth, createString, dataset1} from "../helpers/helpers";
import {runDb} from "../../src/repositories/DB";

const req = agent(app)

describe('/blogs', () => {
    beforeAll(async () => { // очистка базы данных перед началом тестирования
        await runDb()
        await req.delete(SETTINGS.PATH.TEST)
    })

    it('should create', async () => {
        setDB()
        const user = {
            login: "uPSOUkiy_i",
            password: "string123S",
            email: "example@example.com"
        }

        const res = await req
            .post(SETTINGS.PATH.AUTH + '/registration')
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(user)
            .expect(204)

        expect(res.body).toEqual(DB.blogs[0])
    })


})