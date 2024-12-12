import { honkaiCharDb, honkaiColDb, honkaiRiseDb } from '../..'
import { newChar, updateChar, updateCharDataType } from '../../types'
import path from 'path'

export const honkaiCharRepository = {
    async getChars(finalConditions: any, limit: number, offset: number) {
        const charCounter = (await honkaiCharDb.find<newChar>(finalConditions).toArray()).length
        const chars = await honkaiCharDb.find<newChar>(finalConditions).sort({ stars: -1, name: 1 }).skip(offset).limit(limit).toArray()
        return {
            chars: chars.map(e => {
                return {
                    id: e.id,
                    img: e.img,
                    stoneTypeId: e.stoneTypeId,
                    pathId: e.pathId,
                    stars: e.stars,
                    name: e.name,
                    charInfo: {
                        recWeapons: e.charInfo?.recWeapons ? e.charInfo.recWeapons : [],
                        firstArtSetfirstHalfId: e.charInfo?.firstArtSetfirstHalfId ? e.charInfo.firstArtSetfirstHalfId : 0,
                        firstArtSetsecondHalfId: e.charInfo?.firstArtSetsecondHalfId ? e.charInfo.firstArtSetsecondHalfId : 0,
                        secondArtSetfirstHalfId: e.charInfo?.secondArtSetfirstHalfId ? e.charInfo.secondArtSetfirstHalfId : 0,
                        secondArtSetsecondHalfId: e.charInfo?.secondArtSetsecondHalfId ? e.charInfo.secondArtSetsecondHalfId : 0,
                        thirdArtSetfirstHalfId: e.charInfo?.thirdArtSetfirstHalfId ? e.charInfo.thirdArtSetfirstHalfId : 0,
                        thirdArtSetsecondHalfId: e.charInfo?.thirdArtSetsecondHalfId ? e.charInfo.thirdArtSetsecondHalfId : 0,
                        firstPlanarSetId: e.charInfo?.firstPlanarSetId ? e.charInfo.firstPlanarSetId : 0,
                        secondPlanarSetId: e.charInfo?.secondPlanarSetId ? e.charInfo.secondPlanarSetId : 0,
                        thirdPlanarSetId: e.charInfo?.thirdPlanarSetId ? e.charInfo.thirdPlanarSetId : 0
                    }
                }
            }),
            total: charCounter
        }
    },
    async getCharsWithSortByPatchNumber(finalConditions: any, limit: number, offset: number) {
        const charCounter = (await honkaiCharDb.find<newChar>(finalConditions).toArray()).length
        const chars = await honkaiCharDb.find<newChar>(finalConditions).sort({ 'charInfo.lastPatch': -1, stars: -1, name: 1 }).skip(offset).limit(limit).toArray()
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
        const charCounter = (await honkaiCharDb.find<newChar>(finalConditions).toArray()).length
        const chars = await honkaiCharDb.find<newChar>(finalConditions).sort({ 'charInfo.patchCounter': -1, stars: -1, name: 1 }).skip(offset).limit(limit).toArray()
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
        const charCounter = (await honkaiCharDb.find<newChar>(finalConditions).toArray()).length
        const chars = await honkaiCharDb.find<newChar>(finalConditions).sort({ 'charInfo.firstPatch': -1, stars: -1, name: 1 }).skip(offset).limit(limit).toArray()
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
            chars: chars.map(e => {
                return {
                    id: e.id,
                    img: e.img,
                    stoneTypeId: e.stoneTypeId,
                    pathId: e.pathId,
                    stars: e.stars,
                    name: e.name,
                }
            }),
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
        const charsElements = await honkaiCharDb.aggregate([{ $group: { _id: { element: "$stoneTypeId", weaponId: "$pathId" }, chars: { $push: { id: "$id", img: "$img", stars: "$stars" } }, count: { $sum: 1 } } }, { $sort: { '_id.weaponId': 1, '_id.element': 1 } }]).toArray()
        const charsRegions = await honkaiCharDb.aggregate([{ $group: { _id: { regionId: "$region" }, chars: { $push: { id: "$id", img: "$img", stars: "$stars" } }, count: { $sum: 1 } } }, { $sort: { '_id.regionId': 1 } }]).toArray()
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
                    'charInfo.ownWeaponId': +data.ownWeaponId,
                    'charInfo.recWeapons': JSON.parse(data.recWeapons),
                    'charInfo.firstArtSetfirstHalfId': +data.firstArtSetfirstHalfId,
                    'charInfo.firstArtSetSecondHalfId': +data.firstArtSetSecondHalfId,
                    'charInfo.secondArtSetfirstHalfId': +data.secondArtSetfirstHalfId,
                    'charInfo.secondArtSetSecondHalfId': +data.secondArtSetSecondHalfId,
                    'charInfo.thirdArtSetfirstHalfId': +data.thirdArtSetfirstHalfId,
                    'charInfo.thirdArtSetSecondHalfId': +data.thirdArtSetSecondHalfId,
                    'charInfo.firstPlanarSetId': +data.firstPlanarSetId,
                    'charInfo.secondPlanarSetId': +data.secondPlanarSetId,
                    'charInfo.thirdPlanarSetId': +data.thirdPlanarSetId,
                    'charInfo.firstArtProp': JSON.parse(data.firstArtProp),
                    'charInfo.secondArtProp': JSON.parse(data.secondArtProp),
                    'charInfo.thirdArtProp': JSON.parse(data.thirdArtProp),
                    'charInfo.fourthArtProp': JSON.parse(data.fourthArtProp),
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
        const char = await honkaiCharDb.find({ 'charInfo.ownWeaponId': id }).toArray()
        return char[0]
    }
}