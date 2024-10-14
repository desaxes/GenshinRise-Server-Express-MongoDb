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
import { zzzRollRouter } from './routes/zzz/roll-router';
import { zzzCollectionRouter } from './routes/zzz/collection-router';
import { zzzRiseRouter } from './routes/zzz/rise-router';
import { zzzWeaponRiseRouter } from './routes/zzz/weapon-rise-router';
import { zzzWeaponCollectionRouter } from './routes/zzz/weapon-collection-router';
import { zzzStatisticRouter } from './routes/zzz/statistic-router';
import { zzzBannerRouter } from './routes/zzz/banner-router';
import { honkaiCharLvlUpRouter } from './routes/honkai/char-lvlup-router';
import { honkaiCharTalentRouter } from './routes/honkai/char-talent-router';
import { honkaiCharRouter } from './routes/honkai/char-router';
import { honkaiWeaponRouter } from './routes/honkai/weapon-router';
import { honkaiRollRouter } from './routes/honkai/roll-router';
import { honkaiCollectionRouter } from './routes/honkai/collection-router';
import { honkaiRiseRouter } from './routes/honkai/rise-router';
import { honkaiWeaponCollectionRouter } from './routes/honkai/weapon-collection-router';
import { honkaiWeaponRiseRouter } from './routes/honkai/weapon-rise-router';
import { honkaiStatisticRouter } from './routes/honkai/statistic-router';
import { honkaiBannerRouter } from './routes/honkai/banner-router';
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
app.use("/zzz/rolls", zzzRollRouter())
app.use("/zzz/collection", zzzCollectionRouter())
app.use("/zzz/rise", zzzRiseRouter())
app.use("/zzz/weaponcollection", zzzWeaponCollectionRouter())
app.use("/zzz/weaponrise", zzzWeaponRiseRouter())
app.use("/zzz/stat", zzzStatisticRouter())
app.use("/zzz/banners", zzzBannerRouter())
app.use("/honkai/lvlup", honkaiCharLvlUpRouter())
app.use("/honkai/talent", honkaiCharTalentRouter())
app.use("/honkai/characters", honkaiCharRouter())
app.use("/honkai/weapons", honkaiWeaponRouter())
app.use("/honkai/rolls", honkaiRollRouter())
app.use("/honkai/collection", honkaiCollectionRouter())
app.use("/honkai/rise", honkaiRiseRouter())
app.use("/honkai/weaponcollection", honkaiWeaponCollectionRouter())
app.use("/honkai/weaponrise", honkaiWeaponRiseRouter())
app.use("/honkai/stat", honkaiStatisticRouter())
app.use("/honkai/banners", honkaiBannerRouter())
