import { charDb, colDb, maxDb, riseDb } from '../..'
import { char, newChar, updateChar, updateCharDataType } from '../../types'
import path from 'path'

export const charRepository = {
    async getChars(finalConditions: any, limit: number, offset: number) {
        const charCounter = (await charDb.find(finalConditions).toArray()).length
        const chars = await charDb.find(finalConditions).sort({ stars: -1, name: 1 }).skip(offset).limit(limit).toArray()
        return {
            chars: chars.map(e => {
                return {
                    id: e.id,
                    img: e.img,
                    stoneTypeId: e.stoneTypeId,
                    weaponId: e.weaponId,
                    talentMaterialId: e.talentMaterialId,
                    stars: e.stars,
                    name: e.name,
                    charInfo: {
                        recWeapons: e.charInfo?.recWeapons ? e.charInfo.recWeapons : [],
                        firstArtSetfirstHalfId: e.charInfo?.firstArtSetfirstHalfId ? e.charInfo.firstArtSetfirstHalfId : 0,
                        firstArtSetSecondHalfId: e.charInfo?.firstArtSetSecondHalfId ? e.charInfo.firstArtSetSecondHalfId : 0,
                        secondArtSetfirstHalfId: e.charInfo?.secondArtSetfirstHalfId ? e.charInfo.secondArtSetfirstHalfId : 0,
                        secondArtSetSecondHalfId: e.charInfo?.secondArtSetSecondHalfId ? e.charInfo.secondArtSetSecondHalfId : 0,
                        thirdArtSetfirstHalfId: e.charInfo?.thirdArtSetfirstHalfId ? e.charInfo.thirdArtSetfirstHalfId : 0,
                        thirdArtSetSecondHalfId: e.charInfo?.thirdArtSetSecondHalfId ? e.charInfo.thirdArtSetSecondHalfId : 0
                    }
                }
            }),
            total: charCounter
        }
    },
    async getCharsWithSortByPatchNumber(finalConditions: any, limit: number, offset: number) {
        const charCounter = (await charDb.find<newChar>(finalConditions).toArray()).length
        const chars = await charDb.find<newChar>(finalConditions).sort({ 'charInfo.lastPatch': -1, stars: -1, name: 1 }).skip(offset).limit(limit).toArray()
        return {
            chars: chars.map(e => {
                return {
                    id: e.id,
                    img: e.img,
                    stars: e.stars,
                    charInfo: {
                        lastPatch: e.charInfo?.lastPatch ? e.charInfo.lastPatch : 0
                    }
                }
            }
            ),
            total: charCounter
        }
    },
    async getCharsWithSortByPatchCounter(finalConditions: any, limit: number, offset: number) {
        const charCounter = (await charDb.find<newChar>(finalConditions).toArray()).length
        const chars = await charDb.find<newChar>(finalConditions).sort({ 'charInfo.patchCounter': -1, stars: -1, name: 1 }).skip(offset).limit(limit).toArray()
        return {
            chars: chars.map(e => {
                return {
                    id: e.id,
                    img: e.img,
                    stars: e.stars,
                    charInfo: {
                        patchCounter: e.charInfo?.patchCounter ? e.charInfo.patchCounter : 0
                    }
                }
            }
            ),
            total: charCounter
        }
    },
    async getCharsWithSortByRelease(finalConditions: any, limit: number, offset: number) {
        const charCounter = (await charDb.find<newChar>(finalConditions).toArray()).length
        const chars = await charDb.find<newChar>(finalConditions).sort({ 'charInfo.firstPatch': -1, stars: -1, name: 1 }).skip(offset).limit(limit).toArray()
        return {
            chars: chars.map(e => {
                return {
                    id: e.id,
                    img: e.img,
                    stars: e.stars,
                    charInfo: {
                        firstPatch: e.charInfo?.firstPatch ? e.charInfo.firstPatch : 0
                    }
                }
            }
            ),
            total: charCounter
        }
    },
    async getCharById(id: string) {
        const char = await charDb.findOne<newChar | null>({ id: parseInt(id) })
        return char
    },
    async createChar(data: char, files: any) {
        const chars = await charDb.find({}).toArray()
        let lastId = chars.length > 0 ? chars[chars.length - 1].id + 1 : 1
        if (files) {
            let fileName = files.img.name
            files.img.mv(path.resolve(__dirname, '../..', 'static/chars', fileName))
            const newChar = await charDb.insertOne(
                {
                    id: lastId,
                    name: data.name,
                    localSpecialtyId: +data.localSpecialtyId,
                    enemyMaterialId: +data.enemyMaterialId,
                    bossMaterialId: +data.bossMaterialId,
                    stoneTypeId: +data.stoneTypeId,
                    talentMaterialId: +data.talentMaterialId,
                    weekBossMaterialId: +data.weekBossMaterialId,
                    img: fileName,
                    weaponId: +data.weaponId,
                    region: +data.region,
                    sex: +data.sex,
                    stars: +data.stars,
                    size: +data.size
                })
            return newChar
        }
        else {
            return undefined
        }
    },
    async getCharsFromCol(finalConditions: any, limit: number, offset: number) {
        const charCounter = (await colDb.find<newChar>(finalConditions).toArray()).length
        const chars = await colDb.find<newChar>(finalConditions).sort({ stars: -1, name: 1 }).skip(offset).limit(limit).toArray()
        return {
            chars: chars.map(e => {
                return {
                    id: e.id,
                    img: e.img,
                    stoneTypeId: e.stoneTypeId,
                    weaponId: e.weaponId,
                    talentMaterialId: e.talentMaterialId,
                    stars: e.stars,
                    name: e.name,
                }
            }),
            total: charCounter
        }
    },
    async getCharByIdFromCol(id: string) {
        const char = await colDb.findOne<newChar | null>({ id: parseInt(id) })
        return char
    },
    async addCharToCol(data: newChar) {
        const dublicate = await colDb.findOne({ id: data.id })
        if (!dublicate) {
            const newChar = await colDb.insertOne(data)
            return newChar
        }
        else {
            return null
        }
    },
    async getMaxValues() {
        const maxValues = await maxDb.find().toArray()
        return maxValues
    },
    async getCharsFromRise(finalConditions: any, limit: number, offset: number) {
        const charCounter = (await riseDb.find<newChar>(finalConditions).toArray()).length
        const chars = await riseDb.find<newChar>(finalConditions).sort({ stars: -1, name: 1 }).skip(offset).limit(limit).toArray()
        return {
            chars: chars,
            total: charCounter
        }
    },
    async getCharByIdFromRise(id: string) {
        const char = await riseDb.findOne<newChar | null>({ id: parseInt(id) })
        return char
    },
    async addCharToRise(data: newChar) {
        const dublicate = await riseDb.findOne({ id: data.id })
        if (!dublicate) {
            const newChar = await riseDb.insertOne({
                id: data.id,
                name: data.name,
                img: data.img,
                stars: +data.stars,
                stoneTypeId: +data.stoneTypeId,
                localSpecialtyId: +data.localSpecialtyId,
                enemyMaterialId: +data.enemyMaterialId,
                bossMaterialId: +data.bossMaterialId,
                talentMaterialId: +data.talentMaterialId,
                weekBossMaterialId: +data.weekBossMaterialId,
                stone1count: 0,
                stone2count: 0,
                stone3count: 0,
                stone4count: 0,
                localSpecialtyCount: 0,
                enemyMaterial1Count: 0,
                enemyMaterial2Count: 0,
                enemyMaterial3Count: 0,
                enemyMaterial1CountForTalent: 0,
                enemyMaterial2CountForTalent: 0,
                enemyMaterial3CountForTalent: 0,
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
    async addMaxValues(data: updateChar) {
        const dublicate = await maxDb.findOne({ id: data.id })
        if (!dublicate) {
            const newMax = await maxDb.insertOne({
                id: data.id,
                stone1count: +data.s1,
                stone2count: +data.s2,
                stone3count: +data.s3,
                stone4count: +data.s4,
                localSpecialtyCount: +data.spec,
                enemyMaterial1Count: +data.emat1,
                enemyMaterial2Count: +data.emat2,
                enemyMaterial3Count: +data.emat3,
                enemyMaterial1CountForTalent: +data.ematT1,
                enemyMaterial2CountForTalent: +data.ematT2,
                enemyMaterial3CountForTalent: +data.ematT3,
                bossMaterialCount: +data.bmat,
                talentMaterial1Count: +data.tal1,
                talentMaterial2Count: +data.tal2,
                talentMaterial3Count: +data.tal3,
                weekBossMaterialCount: +data.wbmat
            })
            return newMax
        }
        else {
            return null
        }
    },
    async updateCharRise(data: updateChar) {
        const updated = await riseDb.updateOne({ id: +data.id },
            {
                $set: {
                    stone1count: +data.s1,
                    stone2count: +data.s2,
                    stone3count: +data.s3,
                    stone4count: +data.s4,
                    localSpecialtyCount: +data.spec,
                    enemyMaterial1Count: +data.emat1,
                    enemyMaterial2Count: +data.emat2,
                    enemyMaterial3Count: +data.emat3,
                    enemyMaterial1CountForTalent: +data.ematT1,
                    enemyMaterial2CountForTalent: +data.ematT2,
                    enemyMaterial3CountForTalent: +data.ematT3,
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
        await colDb.deleteOne({ id: +id })
    },
    async removeCharfromRise(id: string) {
        await riseDb.deleteOne({ id: +id })
    },
    async removeMaxValues(id: string) {
        await maxDb.deleteOne({ id: +id })
    },
    async getCharStat() {
        const charsElements = await charDb.aggregate([{ $group: { _id: { element: "$stoneTypeId", weaponId: "$weaponId" }, chars: { $push: { id: "$id", img: "$img", stars: "$stars" } }, count: { $sum: 1 } } }, { $sort: { '_id.weaponId': 1, '_id.element': 1 } }]).toArray()
        const charsRegions = await charDb.aggregate([{ $group: { _id: { regionId: "$region" }, chars: { $push: { id: "$id", img: "$img", stars: "$stars" } }, count: { $sum: 1 } } }, { $sort: { '_id.regionId': 1 } }]).toArray()
        const colElements = await colDb.aggregate([{ $group: { _id: { element: "$stoneTypeId" }, count: { $sum: 1 } } }]).toArray()
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
        const updated = await charDb.updateOne({ id: +data.id },
            {
                $set: {
                    'charInfo.ownWeaponId': +data.ownWeaponId,
                    'charInfo.recWeapons': JSON.parse(data.recWeapons),
                    'charInfo.firstArtSetfirstHalfId': +data.firstArtSetfirstHalfId,
                    'charInfo.firstArtSetSecondHalfId': +data.firstArtSetSecondHalfId,
                    'charInfo.secondArtSetfirstHalfId': +data.secondArtSetfirstHalfId,
                    'charInfo.secondArtSetSecondHalfId': +data.secondArtSetSecondHalfId,
                    'charInfo.thirdArtSetfirstHalfId': +data.thirdArtSetfirstHalfId,
                    'charInfo.thirdArtSetSecondHalfId': +data.thirdArtSetSecondHalfId,
                    'charInfo.firstArtProp': JSON.parse(data.firstArtProp),
                    'charInfo.secondArtProp': JSON.parse(data.secondArtProp),
                    'charInfo.thirdArtProp': JSON.parse(data.thirdArtProp),
                    'charInfo.charProps': JSON.parse(data.charProps),
                    'charInfo.firstTeam': JSON.parse(data.firstTeam),
                    'charInfo.secondTeam': JSON.parse(data.secondTeam),
                    'charInfo.thirdTeam': JSON.parse(data.thirdTeam),
                    'charInfo.info': data.info
                }
            }
        )
        return updated
    },
    async getCharForWeapon(id: number) {
        const char = await charDb.find({ 'charInfo.ownWeaponId': id }).toArray()
        return char[0]
    }
}