import { charDb, maxWeaponDb, wcolDb, weaponDb, wriseDb } from '../..'
import { newWeapon, updateWeapon, updateWeaponDataType, weaponType } from '../../types'
import path from 'path'

export const weaponRepository = {
    async getWeapons(finalConditions: any, limit: number, offset: number) {
        const weaponCounter = (await weaponDb.find<newWeapon>(finalConditions).toArray()).length
        const weapons = await weaponDb.find<newWeapon>(finalConditions).sort({ stars: -1, name: 1 }).skip(offset).limit(limit).toArray()
        return {
            weapons: weapons,
            total: weaponCounter
        }
    },
    async getWeaponById(id: string) {
        const weapon = await weaponDb.findOne<newWeapon | null>({ id: parseInt(id) })
        return weapon
    },
    
    async createWeapon(data: weaponType, files: any) {
        const weapons = await weaponDb.find({}).toArray()
        let lastId = weapons.length > 0 ? weapons[weapons.length - 1].id + 1 : 1
        if (files) {
            let fileName = files.img.name
            files.img.mv(path.resolve(__dirname, '../..', 'static/weapons', fileName))
            const newWeapon = await weaponDb.insertOne(
                {
                    id: lastId,
                    name: data.name,
                    enemyMaterialId: +data.enemyMaterialId,
                    enemyWeaponMaterialId: +data.enemyWeaponMaterialId,
                    weaponMaterialId: +data.weaponMaterialId,
                    img: fileName,
                    weaponId: +data.weaponId,
                    stars: +data.stars
                })
            return newWeapon
        }
        else {
            return undefined
        }
    },
    async getWeaponsFromCol(finalConditions: any, limit: number, offset: number) {
        const weaponsCounter = (await wcolDb.find<newWeapon>(finalConditions).toArray()).length
        const weapons = await wcolDb.find<newWeapon>(finalConditions).sort({ stars: -1, name: 1 }).skip(offset).limit(limit).toArray()

        return {
            weapons: weapons,
            total: weaponsCounter
        }
    },
    async getWeaponByIdFromCol(id: string) {
        const weapon = await wcolDb.findOne<newWeapon | null>({ id: parseInt(id) })
        return weapon
    },
    async addWeaponToCol(data: newWeapon) {
        const dublicate = await wcolDb.findOne({ id: data.id })
        if (!dublicate) {
            const newWeapon = await wcolDb.insertOne(data)
            return newWeapon
        }
        else {
            return null
        }
    },
    async getMaxValues() {
        const maxValues = await maxWeaponDb.find().toArray()
        return maxValues
    },
    async getWeaponsFromRise(finalConditions: any, limit: number, offset: number) {
        const weaponCounter = (await wriseDb.find<newWeapon>(finalConditions).toArray()).length
        const weapons = await wriseDb.find<newWeapon>(finalConditions).sort({ stars: -1, name: 1 }).skip(offset).limit(limit).toArray()
        return {
            weapons: weapons,
            total: weaponCounter
        }
    },
    async getWeaponByIdFromRise(id: string) {
        const weapon = await wriseDb.findOne<newWeapon | null>({ id: parseInt(id) })
        return weapon
    },
    async addWeaponToRise(data: newWeapon) {
        const dublicate = await wriseDb.findOne({ id: data.id })
        if (!dublicate) {
            const newWeapon = await wriseDb.insertOne({
                id: data.id,
                name: data.name,
                img: data.img,
                stars: +data.stars,
                weaponId: +data.weaponId,
                enemyWeaponMaterialId: +data.enemyWeaponMaterialId,
                enemyMaterialId: +data.enemyMaterialId,
                weaponMaterialId: +data.weaponMaterialId,
                weaponMat1Count: 0,
                weaponMat2Count: 0,
                weaponMat3Count: 0,
                weaponMat4Count: 0,
                enemyMat1Count: 0,
                enemyMat2Count: 0,
                enemyMat3Count: 0,
                enemyWMat1Count: 0,
                enemyWMat2Count: 0,
                enemyWMat3Count: 0
            })
            return newWeapon
        }
        else {
            return null
        }
    },
    async addMaxValues(data: updateWeapon) {
        const dublicate = await maxWeaponDb.findOne({ id: data.id })
        if (!dublicate) {
            const newMax = await maxWeaponDb.insertOne({
                id: data.id,
                weaponMat1Count: +data.wmat1,
                weaponMat2Count: +data.wmat2,
                weaponMat3Count: +data.wmat3,
                weaponMat4Count: +data.wmat4,
                enemyMat1Count: +data.emat1,
                enemyMat2Count: +data.emat2,
                enemyMat3Count: +data.emat3,
                enemyWMat1Count: +data.ewmat1,
                enemyWMat2Count: +data.ewmat2,
                enemyWMat3Count: +data.ewmat3
            })
            return newMax
        }
        else {
            return null
        }
    },
    async updateWeaponRise(data: updateWeapon) {
        const updated = await wriseDb.updateOne({ id: +data.id },
            {
                $set: {
                    weaponMat1Count: +data.wmat1,
                    weaponMat2Count: +data.wmat2,
                    weaponMat3Count: +data.wmat3,
                    weaponMat4Count: +data.wmat4,
                    enemyMat1Count: +data.emat1,
                    enemyMat2Count: +data.emat2,
                    enemyMat3Count: +data.emat3,
                    enemyWMat1Count: +data.ewmat1,
                    enemyWMat2Count: +data.ewmat2,
                    enemyWMat3Count: +data.ewmat3
                }
            }
        )
        return updated
    },
    async removeWeaponfromCol(id: string) {
        await wcolDb.deleteOne({ id: +id })
    },
    async removeWeaponfromRise(id: string) {
        await wriseDb.deleteOne({ id: +id })
    },
    async removeMaxValues(id: string) {
        await maxWeaponDb.deleteOne({ id: +id })
    },
    async updateWeaponInfo(data: updateWeaponDataType) {
        const updated = await weaponDb.updateOne({ id: +data.id },
            {
                $set: {
                    weaponInfo: {
                        prop: JSON.parse(data.prop),
                        info: data.info,
                        attack: data.attack,
                        propValue: data.propValue
                    }
                }
            }
        )
        return updated
    }
}