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
    erollDb, srollDb
}
