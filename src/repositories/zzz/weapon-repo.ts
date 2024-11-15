import { maxWeaponDb, wcolDb, weaponDb, wriseDb, zzzWcolDb, zzzWeaponDb, zzzWriseDb } from '../..'
import { newWeapon, updateWeapon, updateWeaponDataType, weaponType } from '../../types'
import path from 'path'

export const zzzWeaponRepository = {
    async getWeapons(finalConditions: any, limit: number, offset: number) {
        const weaponCounter = (await zzzWeaponDb.find<newWeapon>(finalConditions).toArray()).length
        const weapons = await zzzWeaponDb.find<newWeapon>(finalConditions).sort({ stars: -1, name: 1 }).skip(offset).limit(limit).toArray()
        return {
            weapons: weapons,
            total: weaponCounter
        }
    },
    async getWeaponById(id: string) {
        const weapon = await zzzWeaponDb.findOne<newWeapon | null>({ id: parseInt(id) })
        return weapon
    },
    async createWeapon(data: weaponType, files: any) {
        const weapons = await zzzWeaponDb.find({}).toArray()
        let lastId = weapons.length > 0 ? weapons[weapons.length - 1].id + 1 : 1
        if (files) {
            let fileName = files.img.name
            files.img.mv(path.resolve(__dirname, '../..', 'static/zzz/weapons', fileName))
            const newWeapon = await zzzWeaponDb.insertOne(
                {
                    id: lastId,
                    name: data.name,
                    weaponMaterialId: +data.weaponMaterialId,
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
        const weaponsCounter = (await zzzWcolDb.find<newWeapon>(finalConditions).toArray()).length
        const weapons = await zzzWcolDb.find<newWeapon>(finalConditions).sort({ stars: -1, name: 1 }).skip(offset).limit(limit).toArray()

        return {
            weapons: weapons,
            total: weaponsCounter
        }
    },
    async getWeaponByIdFromCol(id: string) {
        const weapon = await zzzWcolDb.findOne<newWeapon | null>({ id: parseInt(id) })
        return weapon
    },
    async addWeaponToCol(data: newWeapon) {
        const dublicate = await zzzWcolDb.findOne({ id: data.id })
        if (!dublicate) {
            const newWeapon = await zzzWcolDb.insertOne(data)
            return newWeapon
        }
        else {
            return null
        }
    },
    async getWeaponsFromRise(finalConditions: any, limit: number, offset: number) {
        const weaponCounter = (await zzzWriseDb.find<newWeapon>(finalConditions).toArray()).length
        const weapons = await zzzWriseDb.find<newWeapon>(finalConditions).sort({ stars: -1, name: 1 }).skip(offset).limit(limit).toArray()
        return {
            weapons: weapons,
            total: weaponCounter
        }
    },
    async getWeaponByIdFromRise(id: string) {
        const weapon = await zzzWriseDb.findOne<newWeapon | null>({ id: parseInt(id) })
        return weapon
    },
    async addWeaponToRise(data: newWeapon) {
        const dublicate = await zzzWriseDb.findOne({ id: data.id })
        if (!dublicate) {
            const newWeapon = await zzzWriseDb.insertOne({
                id: data.id,
                name: data.name,
                img: data.img,
                stars: +data.stars,
                weaponMaterialId: +data.weaponMaterialId,
                weaponMat1Count: 0,
                weaponMat2Count: 0,
                weaponMat3Count: 0,
            })
            return newWeapon
        }
        else {
            return null
        }
    },
    async updateWeaponRise(data: updateWeapon) {
        const updated = await zzzWriseDb.updateOne({ id: +data.id },
            {
                $set: {
                    weaponMat1Count: +data.wmat1,
                    weaponMat2Count: +data.wmat2,
                    weaponMat3Count: +data.wmat3,
                }
            }
        )
        return updated
    },
    async removeWeaponfromCol(id: string) {
        await zzzWcolDb.deleteOne({ id: +id })
    },
    async removeWeaponfromRise(id: string) {
        await zzzWriseDb.deleteOne({ id: +id })
    },
    async updateWeaponInfo(data: updateWeaponDataType) {
        const updated = await zzzWeaponDb.updateOne({ id: +data.id },
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