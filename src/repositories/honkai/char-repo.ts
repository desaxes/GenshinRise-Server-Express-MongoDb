import { charDb, colDb, honkaiCharDb, honkaiColDb, honkaiRiseDb, maxDb, riseDb, zzzCharDb, zzzColDb, zzzRiseDb } from '../..'
import { char, newChar, updateChar, updateCharDataType } from '../../types'
import path from 'path'

export const honkaiCharRepository = {
    async getChars(finalConditions: any, limit: number, offset: number) {
        const charCounter = (await honkaiCharDb.find<newChar>(finalConditions).toArray()).length
        const chars = await honkaiCharDb.find<newChar>(finalConditions).sort({ stars: -1, name: 1 }).skip(offset).limit(limit).toArray()
        return {
            chars: chars,
            total: charCounter
        }
    },
    async getCharById(id: string) {
        const char = await honkaiCharDb.findOne<newChar | null>({ id: parseInt(id) })
        return char
    },
    async createChar(data: any, files: any) {
        const chars = await honkaiCharDb.find({}).toArray()
        let lastId = chars.length > 0 ? chars[chars.length - 1].id + 1 : 1
        if (files) {
            let fileName = files.img.name
            files.img.mv(path.resolve(__dirname, '../..', 'static/honkai/chars', fileName))
            const newChar = await honkaiCharDb.insertOne(
                {
                    id: lastId,
                    name: data.name,
                    stoneTypeId: +data.stoneTypeId,
                    enemyMaterialId: +data.enemyMaterialId,
                    bossMaterialId: +data.bossMaterialId,
                    talentMaterialId: +data.talentMaterialId,
                    weekBossMaterialId: +data.weekBossMaterialId,
                    pathId: +data.pathId,
                    img: fileName,
                    region: +data.region,
                    sex: +data.sex,
                    stars: +data.stars,
                })
            return newChar
        }
        else {
            return undefined
        }
    },
    async getCharsFromCol(finalConditions: any, limit: number, offset: number) {
        const charCounter = (await honkaiColDb.find<newChar>(finalConditions).toArray()).length
        const chars = await honkaiColDb.find<newChar>(finalConditions).sort({ stars: -1, name: 1 }).skip(offset).limit(limit).toArray()

        return {
            chars: chars,
            total: charCounter
        }
    },
    async getCharByIdFromCol(id: string) {
        const char = await honkaiColDb.findOne<newChar | null>({ id: parseInt(id) })
        return char
    },
    async addCharToCol(data: newChar) {
        const dublicate = await honkaiColDb.findOne({ id: data.id })
        if (!dublicate) {
            const newChar = await honkaiColDb.insertOne(data)
            return newChar
        }
        else {
            return null
        }
    },
    async getCharsFromRise(finalConditions: any, limit: number, offset: number) {
        const charCounter = (await honkaiRiseDb.find<newChar>(finalConditions).toArray()).length
        const chars = await honkaiRiseDb.find<newChar>(finalConditions).sort({ stars: -1, name: 1 }).skip(offset).limit(limit).toArray()
        return {
            chars: chars,
            total: charCounter
        }
    },
    async getCharByIdFromRise(id: string) {
        const char = await honkaiRiseDb.findOne<newChar | null>({ id: parseInt(id) })
        return char
    },
    async addCharToRise(data: any) {
        const dublicate = await honkaiRiseDb.findOne({ id: data.id })
        if (!dublicate) {
            const newChar = await honkaiRiseDb.insertOne({
                id: data.id,
                name: data.name,
                img: data.img,
                stars: +data.stars,
                pathId: +data.pathId,
                stoneTypeId: +data.stoneTypeId,
                enemyMaterialId: +data.enemyMaterialId,
                bossMaterialId: +data.bossMaterialId,
                talentMaterialId: +data.talentMaterialId,
                weekBossMaterialId: +data.weekBossMaterialId,
                enemyMaterial1Count: 0,
                enemyMaterial2Count: 0,
                enemyMaterial3Count: 0,
                bossMaterialCount: 0,
                talentMaterial1Count: 0,
                talentMaterial2Count: 0,
                talentMaterial3Count: 0,
                weekBossMaterialCount: 0
            })
            return newChar
        }
        else {
            return null
        }
    },
    async updateCharRise(data: updateChar) {
        const updated = await honkaiRiseDb.updateOne({ id: +data.id },
            {
                $set: {
                    enemyMaterial1Count: +data.emat1,
                    enemyMaterial2Count: +data.emat2,
                    enemyMaterial3Count: +data.emat3,
                    bossMaterialCount: +data.bmat,
                    talentMaterial1Count: +data.tal1,
                    talentMaterial2Count: +data.tal2,
                    talentMaterial3Count: +data.tal3,
                    weekBossMaterialCount: +data.wbmat
                }
            }
        )
        return updated
    },
    async removeCharfromCol(id: string) {
        await honkaiColDb.deleteOne({ id: +id })
    },
    async removeCharfromRise(id: string) {
        await honkaiRiseDb.deleteOne({ id: +id })
    },
    async getCharStat() {
        const charsElements = await honkaiCharDb.aggregate([{ $group: { _id: { element: "$stoneTypeId", weaponId: "$pathId" }, chars: { $push: { id: "$id", img: "$img" } }, count: { $sum: 1 } } }, { $sort: { '_id.weaponId': 1, '_id.element': 1 } }]).toArray()
        const charsRegions = await honkaiCharDb.aggregate([{ $group: { _id: { regionId: "$region" }, chars: { $push: { id: "$id", img: "$img" } }, count: { $sum: 1 } } }, { $sort: { '_id.regionId': 1 } }]).toArray()
        const colElements = await honkaiColDb.aggregate([{ $group: { _id: { element: "$stoneTypeId" }, count: { $sum: 1 } } }]).toArray()
        return {
            elements: {
                all: charsElements,
                col: colElements
            },
            regions: {
                all: charsRegions
            }
        }
    },
    async updateCharInfo(data: updateCharDataType) {
        const updated = await honkaiCharDb.updateOne({ id: +data.id },
            {
                $set: {
                    charInfo: {
                        ownWeaponId: +data.ownWeaponId,
                        recWeapons: JSON.parse(data.recWeapons),
                        // recFiveStarWeaponId: +data.recFiveStarWeaponId,
                        // recFourStarWeaponId: +data.recFourStarWeaponId,
                        firstArtSetfirstHalfId: +data.firstArtSetfirstHalfId,
                        firstArtSetSecondHalfId: +data.firstArtSetSecondHalfId,
                        secondArtSetfirstHalfId: +data.secondArtSetfirstHalfId,
                        secondArtSetSecondHalfId: +data.secondArtSetSecondHalfId,
                        thirdArtSetfirstHalfId: +data.thirdArtSetfirstHalfId,
                        thirdArtSetSecondHalfId: +data.thirdArtSetSecondHalfId,
                        firstPlanarSetId: +data.firstPlanarSetId,
                        secondPlanarSetId: +data.secondPlanarSetId,
                        thirdPlanarSetId: +data.thirdPlanarSetId,
                        firstArtProp: JSON.parse(data.firstArtProp),
                        secondArtProp: JSON.parse(data.secondArtProp),
                        thirdArtProp: JSON.parse(data.thirdArtProp),
                        fourthArtProp: JSON.parse(data.fourthArtProp),
                        charProps: JSON.parse(data.charProps),
                        firstTeam: JSON.parse(data.firstTeam),
                        secondTeam: JSON.parse(data.secondTeam),
                        thirdTeam: JSON.parse(data.thirdTeam),
                        info: data.info
                    }
                }
            }
        )
        return updated
    },
    async getCharForWeapon(id: number) {
        const char = await honkaiCharDb.find({ 'charInfo.ownWeaponId': id }).toArray()
        return char[0]
    }
}