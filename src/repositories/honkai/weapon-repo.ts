import { honkaiWcolDb, honkaiWeaponDb, honkaiWriseDb } from '../..'
import { newWeapon, updateWeapon, updateWeaponDataType } from '../../types'
import path from 'path'

export const honkaiWeaponRepository = {
    async getWeapons(finalConditions: any, limit: number, offset: number) {
        const weaponCounter = (await honkaiWeaponDb.find<newWeapon>(finalConditions).toArray()).length
        const weapons = await honkaiWeaponDb.find<newWeapon>(finalConditions).sort({ stars: -1, name: 1 }).skip(offset).limit(limit).toArray()
        return {
            weapons: weapons,
            total: weaponCounter
        }
    },
    async getWeaponById(id: string) {
        const weapon = await honkaiWeaponDb.findOne<newWeapon | null>({ id: parseInt(id) })
        return weapon
    },
    async createWeapon(data: any, files: any) {
        const weapons = await honkaiWeaponDb.find({}).toArray()
        let lastId = weapons.length > 0 ? weapons[weapons.length - 1].id + 1 : 1
        if (files) {
            let fileName = files.img.name
            files.img.mv(path.resolve(__dirname, '../..', 'static/honkai/weapons', fileName))
            const newWeapon = await honkaiWeaponDb.insertOne(
                {
                    id: lastId,
                    name: data.name,
                    enemyMaterialId: +data.enemyMaterialId,
                    weaponMaterialId: +data.weaponMaterialId,
                    pathId: +data.pathId,
                    img: fileName,
                    stars: +data.stars
                })
            return newWeapon
        }
        else {
            return undefined
        }
    },
    async getWeaponsFromCol(finalConditions: any, limit: number, offset: number) {
        const weaponsCounter = (await honkaiWcolDb.find<newWeapon>(finalConditions).toArray()).length
        const weapons = await honkaiWcolDb.find<newWeapon>(finalConditions).sort({ stars: -1, name: 1 }).skip(offset).limit(limit).toArray()

        return {
            weapons: weapons,
            total: weaponsCounter
        }
    },
    async getWeaponByIdFromCol(id: string) {
        const weapon = await honkaiWcolDb.findOne<newWeapon | null>({ id: parseInt(id) })
        return weapon
    },
    async addWeaponToCol(data: newWeapon) {
        const dublicate = await honkaiWcolDb.findOne({ id: data.id })
        if (!dublicate) {
            const newWeapon = await honkaiWcolDb.insertOne(data)
            return newWeapon
        }
        else {
            return null
        }
    },
    async getWeaponsFromRise(finalConditions: any, limit: number, offset: number) {
        const weaponCounter = (await honkaiWriseDb.find<newWeapon>(finalConditions).toArray()).length
        const weapons = await honkaiWriseDb.find<newWeapon>(finalConditions).sort({ stars: -1, name: 1 }).skip(offset).limit(limit).toArray()
        return {
            weapons: weapons,
            total: weaponCounter
        }
    },
    async getWeaponByIdFromRise(id: string) {
        const weapon = await honkaiWriseDb.findOne<newWeapon | null>({ id: parseInt(id) })
        return weapon
    },
    async addWeaponToRise(data: any) {
        const dublicate = await honkaiWriseDb.findOne({ id: data.id })
        if (!dublicate) {
            const newWeapon = await honkaiWriseDb.insertOne({
                id: data.id,
                name: data.name,
                img: data.img,
                stars: +data.stars,
                weaponMaterialId: +data.weaponMaterialId,
                enemyMaterialId: +data.enemyMaterialId,
                weaponMat1Count: 0,
                weaponMat2Count: 0,
                weaponMat3Count: 0,
                enemyMat1Count: 0,
                enemyMat2Count: 0,
                enemyMat3Count: 0
            })
            return newWeapon
        }
        else {
            return null
        }
    },
    async updateWeaponRise(data: updateWeapon) {
        const updated = await honkaiWriseDb.updateOne({ id: +data.id },
            {
                $set: {
                    weaponMat1Count: +data.wmat1,
                    weaponMat2Count: +data.wmat2,
                    weaponMat3Count: +data.wmat3,
                    enemyMat1Count: +data.emat1,
                    enemyMat2Count: +data.emat2,
                    enemyMat3Count: +data.emat3,
                }
            }
        )
        return updated
    },
    async removeWeaponfromCol(id: string) {
        await honkaiWcolDb.deleteOne({ id: +id })
    },
    async removeWeaponfromRise(id: string) {
        await honkaiWriseDb.deleteOne({ id: +id })
    },
    async updateWeaponInfo(data: updateWeaponDataType) {
        const updated = await honkaiWeaponDb.updateOne({ id: +data.id },
            {
                $set: {
                    weaponInfo: {
                        prop: JSON.parse(data.prop),
                        info: data.info,
                        attack: data.attack,
                        def: data.def,
                        hp: data.hp,
                        propValue: data.propValue
                    }
                }
            }
        )
        return updated
    }
}