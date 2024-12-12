import path from "path"
import { honkaiBannerDb, honkaiCharDb } from "../.."

export const honkaiBannerRepository = {
    async getAllBanners(limit: number, offset: number) {
        const banners = await honkaiBannerDb.find().sort({ year: 1, lmonth: 1, lday: 1 }).skip(offset).limit(limit).toArray()
        return {
            banners: banners
        }
    },
    async getBanner(id: number) {
        const banner = await honkaiBannerDb.find({ id: id }).toArray()
        return banner[0]
    },
    async addBanner(data: any, files: any) {
        const banners = await honkaiBannerDb.find({}).toArray()
        let lastId = banners.length > 0 ? banners[banners.length - 1].id + 1 : 1
        if (files.img1) {
            let fileName1 = files.img1.name
            let fileName2 = ''
            files.img1.mv(path.resolve(__dirname, '../..', 'static/honkai/bannerImgs', fileName1))
            if (files.img2) {
                fileName2 = files.img2.name
                files.img2.mv(path.resolve(__dirname, '../..', 'static/honkai/bannerImgs', fileName2))
            }
            const banner = await honkaiBannerDb.insertOne({
                id: lastId,
                year: +data.year,
                lmonth: +data.lmonth,
                lday: +data.lday,
                hmonth: +data.hmonth,
                hday: +data.hday,
                img1: fileName1,
                img2: fileName2,
                charId1: data.charId1,
                charName1: data.charName1,
                charId2: data.charId2,
                charName2: data.charName2,
                charId3: data.charId3,
                charName3: data.charName3,
                charId4: data.charId4,
                charName4: data.charName4,
                epicCharId1: data.epicCharId1,
                epicCharId2: data.epicCharId2,
                epicCharId3: data.epicCharId3,
                patchNumber: data.patchNumber
            })
            if (data.charId1) {
                const char = await honkaiCharDb.findOne({ id: +data.charId1 })
                let release = (char?.charInfo?.firstPatch &&
                    char?.charInfo?.firstPatch != 0) ?
                    char.charInfo.firstPatch : +data.patchNumber
                await honkaiCharDb.updateOne({ id: +data.charId1 },
                    {
                        $set: {
                            'charInfo.lastPatch': +data.patchNumber,
                            'charInfo.firstPatch': release
                        },
                        $inc: {
                            'charInfo.patchCounter': 1
                        }
                    }
                )
            }
            if (data.charId2) {
                const char = await honkaiCharDb.findOne({ id: +data.charId2 })
                let release = (char?.charInfo?.firstPatch &&
                    char?.charInfo?.firstPatch != 0) ?
                    char.charInfo.firstPatch : +data.patchNumber
                await honkaiCharDb.updateOne({ id: +data.charId2 },
                    {
                        $set: {
                            'charInfo.lastPatch': +data.patchNumber,
                            'charInfo.firstPatch': release
                        },
                        $inc: {
                            'charInfo.patchCounter': 1
                        }
                    }
                )
            }
            if (data.charId3) {
                const char = await honkaiCharDb.findOne({ id: +data.charId3 })
                let release = (char?.charInfo?.firstPatch &&
                    char?.charInfo?.firstPatch != 0) ?
                    char.charInfo.firstPatch : +data.patchNumber
                await honkaiCharDb.updateOne({ id: +data.charId3 },
                    {
                        $set: {
                            'charInfo.lastPatch': +data.patchNumber,
                            'charInfo.firstPatch': release
                        },
                        $inc: {
                            'charInfo.patchCounter': 1
                        }
                    }
                )
            }
            if (data.charId4) {
                const char = await honkaiCharDb.findOne({ id: +data.charId4 })
                let release = (char?.charInfo?.firstPatch &&
                    char?.charInfo?.firstPatch != 0) ?
                    char.charInfo.firstPatch : +data.patchNumber
                await honkaiCharDb.updateOne({ id: +data.charId4 },
                    {
                        $set: {
                            'charInfo.lastPatch': +data.patchNumber,
                            'charInfo.firstPatch': release
                        },
                        $inc: {
                            'charInfo.patchCounter': 1
                        }
                    }
                )
            }
            if (data.epicCharId1) {
                const char = await honkaiCharDb.findOne({ id: +data.epicCharId1 })
                let release = (char?.charInfo?.firstPatch &&
                    char?.charInfo?.firstPatch != 0) ?
                    char.charInfo.firstPatch : +data.patchNumber
                await honkaiCharDb.updateOne({ id: +data.epicCharId1 },
                    {
                        $set: {
                            'charInfo.lastPatch': +data.patchNumber,
                            'charInfo.firstPatch': release
                        },
                        $inc: {
                            'charInfo.patchCounter': 1
                        }
                    }
                )
            }
            if (data.epicCharId2) {
                const char = await honkaiCharDb.findOne({ id: +data.epicCharId2 })
                let release = (char?.charInfo?.firstPatch &&
                    char?.charInfo?.firstPatch != 0) ?
                    char.charInfo.firstPatch : +data.patchNumber
                await honkaiCharDb.updateOne({ id: +data.epicCharId2 },
                    {
                        $set: {
                            'charInfo.lastPatch': +data.patchNumber,
                            'charInfo.firstPatch': release
                        },
                        $inc: {
                            'charInfo.patchCounter': 1
                        }
                    }
                )
            }
            if (data.epicCharId3) {
                const char = await honkaiCharDb.findOne({ id: +data.epicCharId3 })
                let release = (char?.charInfo?.firstPatch &&
                    char?.charInfo?.firstPatch != 0) ?
                    char.charInfo.firstPatch : +data.patchNumber
                await honkaiCharDb.updateOne({ id: +data.epicCharId3 },
                    {
                        $set: {
                            'charInfo.lastPatch': +data.patchNumber,
                            'charInfo.firstPatch': release
                        },
                        $inc: {
                            'charInfo.patchCounter': 1
                        }
                    }
                )
            }
            return banner
        }
        else {
            return undefined
        }
    },
}