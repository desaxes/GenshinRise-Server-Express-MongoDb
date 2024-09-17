import express from 'express'
import { charRouter } from './routes/char-router'
import path from 'path';
import fileUpload from 'express-fileupload';
import { charLvlUpRouter } from './routes/char-lvlup-router';
import { charTalentRouter } from './routes/char-talent-router';
import cors from 'cors'
import { collectionRouter } from './routes/collection-router';
import { riseRouter } from './routes/rise-router';
import { weaponRouter } from './routes/weapon-router';
import { weaponRiseRouter } from './routes/weapon-rise-router';
import { weaponCollectionRouter } from './routes/weapon-collection-router';
import { weaponLvlUpRouter } from './routes/weapon-lvlup-router';
import { rollRouter } from './routes/roll-router';
import { statisticRouter } from './routes/statistic-router';
import { bannerRouter } from './routes/banner-router';
export const app = express()

const jsonBodyMiddleware = express.json()
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE']
}))
app.use(jsonBodyMiddleware);
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use("/characters", charRouter())
app.use("/collection", collectionRouter())
app.use("/rise", riseRouter())
app.use("/lvlup", charLvlUpRouter())
app.use("/talent", charTalentRouter())
app.use("/weapons", weaponRouter())
app.use("/weaponrise", weaponRiseRouter())
app.use("/weaponcollection", weaponCollectionRouter())
app.use("/weaponlvlup", weaponLvlUpRouter())
app.use("/rolls", rollRouter())
app.use("/stat", statisticRouter())
app.use("/banners", bannerRouter())



