import { Collection, MongoClient } from "mongodb";
import { app } from "./app"

const mongoClient = new MongoClient("mongodb://localhost:27017");
const port = process.env.PORT || 3030;

let charDb: Collection
let bossDb: Collection
let enemyDb: Collection
let specDb: Collection
let stonesDb: Collection
let talentDb: Collection
let wBossDb: Collection
let colDb: Collection
let riseDb: Collection
let wcolDb: Collection
let wriseDb: Collection
let timersDb: Collection
let maxDb: Collection
let maxWeaponDb: Collection
let weaponDb: Collection
let wmatDb: Collection
let ewmatDb: Collection
let wrollDb: Collection
let erollDb: Collection
let srollDb: Collection
let bannerDb: Collection
let gemsDb: Collection
let honkaiCharDb: Collection
let honkaiBossDb: Collection
let honkaiEnemyDb: Collection
let honkaiTalentDb: Collection
let honkaiWBossDb: Collection
let honkaiColDb: Collection
let honkaiRiseDb: Collection
let honkaiWcolDb: Collection
let honkaiWriseDb: Collection
let honkaiWeaponDb: Collection
let honkaiWrollDb: Collection
let honkaiErollDb: Collection
let honkaiSrollDb: Collection
let honkaiBannerDb: Collection
let honkaiGemsDb: Collection
let zzzCharDb: Collection
let zzzBossDb: Collection
let zzzEnemyDb: Collection
let zzzTalentDb: Collection
let zzzWBossDb: Collection
let zzzColDb: Collection
let zzzRiseDb: Collection
let zzzWcolDb: Collection
let zzzWriseDb: Collection
let zzzWeaponDb: Collection
let zzzWrollDb: Collection
let zzzErollDb: Collection
let zzzSrollDb: Collection
let zzzBannerDb: Collection
let zzzWmatDb: Collection
let zzzGemsDb: Collection

(async () => {
    try {
        await mongoClient.connect();
        charDb = mongoClient.db("Genshin").collection('Characters')
        bossDb = mongoClient.db("Genshin").collection('BossMaterials')
        enemyDb = mongoClient.db("Genshin").collection('EnemyMaterials')
        specDb = mongoClient.db("Genshin").collection('LocalSpecialtys')
        stonesDb = mongoClient.db("Genshin").collection('Stones')
        talentDb = mongoClient.db("Genshin").collection('TalentMaterials')
        wBossDb = mongoClient.db("Genshin").collection('WeekBossMaterials')
        wmatDb = mongoClient.db("Genshin").collection('WeaponMaterials')
        ewmatDb = mongoClient.db("Genshin").collection('EnemyWeaponMaterials')
        colDb = mongoClient.db("Genshin").collection('Collection')
        riseDb = mongoClient.db("Genshin").collection('Rising')
        wcolDb = mongoClient.db("Genshin").collection('WeaponCollection')
        wriseDb = mongoClient.db("Genshin").collection('WeaponRising')
        timersDb = mongoClient.db("Genshin").collection('MatTimers')
        maxDb = mongoClient.db("Genshin").collection('MaxValues')
        maxWeaponDb = mongoClient.db("Genshin").collection('MaxWeaponValues')
        weaponDb = mongoClient.db("Genshin").collection('Weapons')
        wrollDb = mongoClient.db("Genshin").collection('WeaponRolls')
        erollDb = mongoClient.db("Genshin").collection('EventRolls')
        srollDb = mongoClient.db("Genshin").collection('StandartRolls')
        bannerDb = mongoClient.db("Genshin").collection('Banners')
        gemsDb = mongoClient.db("Genshin").collection('Gems')
        honkaiCharDb = mongoClient.db("Honkai").collection('Characters')
        honkaiBossDb = mongoClient.db("Honkai").collection('BossMaterials')
        honkaiEnemyDb = mongoClient.db("Honkai").collection('EnemyMaterials')
        honkaiTalentDb = mongoClient.db("Honkai").collection('TalentMaterials')
        honkaiWBossDb = mongoClient.db("Honkai").collection('WeekBossMaterials')
        honkaiColDb = mongoClient.db("Honkai").collection('Collection')
        honkaiRiseDb = mongoClient.db("Honkai").collection('Rising')
        honkaiWcolDb = mongoClient.db("Honkai").collection('WeaponCollection')
        honkaiWriseDb = mongoClient.db("Honkai").collection('WeaponRising')
        honkaiWeaponDb = mongoClient.db("Honkai").collection('Weapons')
        honkaiWrollDb = mongoClient.db("Honkai").collection('WeaponRolls')
        honkaiErollDb = mongoClient.db("Honkai").collection('EventRolls')
        honkaiSrollDb = mongoClient.db("Honkai").collection('StandartRolls')
        honkaiBannerDb = mongoClient.db("Honkai").collection('Banners')
        honkaiGemsDb = mongoClient.db("Honkai").collection('Gems')
        zzzCharDb = mongoClient.db("ZZZ").collection('Characters')
        zzzBossDb = mongoClient.db("ZZZ").collection('BossMaterials')
        zzzEnemyDb = mongoClient.db("ZZZ").collection('EnemyMaterials')
        zzzTalentDb = mongoClient.db("ZZZ").collection('TalentMaterials')
        zzzWBossDb = mongoClient.db("ZZZ").collection('WeekBossMaterials')
        zzzColDb = mongoClient.db("ZZZ").collection('Collection')
        zzzRiseDb = mongoClient.db("ZZZ").collection('Rising')
        zzzWcolDb = mongoClient.db("ZZZ").collection('WeaponCollection')
        zzzWriseDb = mongoClient.db("ZZZ").collection('WeaponRising')
        zzzWeaponDb = mongoClient.db("ZZZ").collection('Weapons')
        zzzWrollDb = mongoClient.db("ZZZ").collection('WeaponRolls')
        zzzErollDb = mongoClient.db("ZZZ").collection('EventRolls')
        zzzSrollDb = mongoClient.db("ZZZ").collection('StandartRolls')
        zzzBannerDb = mongoClient.db("ZZZ").collection('Banners')
        zzzWmatDb = mongoClient.db("ZZZ").collection('WeaponMaterials')
        zzzGemsDb = mongoClient.db("ZZZ").collection('Gems')
        app.listen(port);
        console.log("Success");
    } catch (err) {
        return console.log(err);
    }
})();

export {
    bossDb, enemyDb, charDb,
    specDb, stonesDb, talentDb,
    wBossDb, colDb, riseDb,
    timersDb, maxDb, weaponDb,
    maxWeaponDb, wcolDb, wriseDb,
    wmatDb, ewmatDb, wrollDb,
    erollDb, srollDb, bannerDb, gemsDb,
    honkaiCharDb,
    honkaiBossDb,
    honkaiEnemyDb,
    honkaiTalentDb,
    honkaiWBossDb,
    honkaiColDb,
    honkaiRiseDb,
    honkaiWcolDb,
    honkaiWriseDb,
    honkaiWeaponDb,
    honkaiWrollDb,
    honkaiErollDb,
    honkaiSrollDb,
    honkaiBannerDb,
    honkaiGemsDb,
    zzzCharDb,
    zzzBossDb,
    zzzEnemyDb,
    zzzTalentDb,
    zzzWBossDb,
    zzzColDb,
    zzzRiseDb,
    zzzWcolDb,
    zzzWriseDb,
    zzzWeaponDb,
    zzzWrollDb,
    zzzErollDb,
    zzzSrollDb,
    zzzBannerDb,
    zzzWmatDb,
    zzzGemsDb
}
