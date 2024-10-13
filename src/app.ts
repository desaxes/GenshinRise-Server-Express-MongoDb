import express from 'express'
import { charRouter } from './routes/genshin/char-router'
import path from 'path';
import fileUpload from 'express-fileupload';
import { charLvlUpRouter } from './routes/genshin/char-lvlup-router';
import { charTalentRouter } from './routes/genshin/char-talent-router';
import cors from 'cors'
import { collectionRouter } from './routes/genshin/collection-router';
import { riseRouter } from './routes/genshin/rise-router';
import { weaponRouter } from './routes/genshin/weapon-router';
import { weaponRiseRouter } from './routes/genshin/weapon-rise-router';
import { weaponCollectionRouter } from './routes/genshin/weapon-collection-router';
import { weaponLvlUpRouter } from './routes/genshin/weapon-lvlup-router';
import { rollRouter } from './routes/genshin/roll-router';
import { statisticRouter } from './routes/genshin/statistic-router';
import { bannerRouter } from './routes/genshin/banner-router';
import { zzzCharLvlUpRouter } from './routes/zzz/char-lvlup-router';
import { zzzCharTalentRouter } from './routes/zzz/char-talent-router';
import { zzzWeaponLvlUpRouter } from './routes/zzz/weapon-lvlup-router';
import { zzzCharRouter } from './routes/zzz/char-router';
import { zzzWeaponRouter } from './routes/zzz/weapon-router';
export const app = express()

const jsonBodyMiddleware = express.json()
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE']
}))
app.use(jsonBodyMiddleware);
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use("/genshin/characters", charRouter())
app.use("/genshin/collection", collectionRouter())
app.use("/genshin/rise", riseRouter())
app.use("/genshin/lvlup", charLvlUpRouter())
app.use("/genshin/talent", charTalentRouter())
app.use("/genshin/weapons", weaponRouter())
app.use("/genshin/weaponrise", weaponRiseRouter())
app.use("/genshin/weaponcollection", weaponCollectionRouter())
app.use("/genshin/weaponlvlup", weaponLvlUpRouter())
app.use("/genshin/rolls", rollRouter())
app.use("/genshin/stat", statisticRouter())
app.use("/genshin/banners", bannerRouter())
app.use("/zzz/lvlup", zzzCharLvlUpRouter())
app.use("/zzz/talent", zzzCharTalentRouter())
app.use("/zzz/weaponlvlup", zzzWeaponLvlUpRouter())
app.use("/zzz/characters", zzzCharRouter())
app.use("/zzz/weapons", zzzWeaponRouter())

