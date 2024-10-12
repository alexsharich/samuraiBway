import {SETTINGS} from "./settings";
import {app} from './app'
import {runDb} from "./repositories/DB";

const startApp = async () => {
    await runDb()
    app.listen(SETTINGS.PORT, () => {
        console.log(`SERVER WAS STARTED ON ${SETTINGS.PORT}`)
    })
}
startApp()