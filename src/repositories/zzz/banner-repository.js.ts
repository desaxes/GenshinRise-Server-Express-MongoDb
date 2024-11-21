import path from "path"
import { bannerDb, erollDb, srollDb, wrollDb, zzzBannerDb, zzzCharDb } from "../.."
import { newRollType, rollType } from "../../types"

export const zzzBannerRepository = {
    async getAllBanners(limit: number, offset: number) {
        const banners = await zzzBannerDb.find().sort({ year: 1, lmonth: 1, lday: 1 }).skip(offset).limit(limit).toArray()
        return {
            banners: banners
        }
    },
    async getBanner(id: number) {
        const banner = await zzzBannerDb.find({ id: id }).toArray()
        return banner[0]
    },
    async addBanner(data: any, files: any) {
        const banners = await zzzBannerDb.find({}).toArray()
        let lastId = banners.length > 0 ? banners[banners.length - 1].id + 1 : 1
        if (files.img1) {
            let fileName1 = files.img1.name
            let fileName2 = ''
            files.img1.mv(path.resolve(__dirname, '../..', 'static/zzz/bannerImgs', fileName1))
            if (files.img2) {
                fileName2 = files.img2.name
                files.img2.mv(path.resolve(__dirname, '../..', 'static/zzz/bannerImgs', fileName2))
            }
            const banner = await zzzBannerDb.insertOne({
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
                epicCharId1: data.epicCharId1,
                epicCharId2: data.epicCharId2,
                epicCharId3: data.epicCharId3,
                patchNumber: data.patchNumber
            })
            if (data.charId1) {
                await zzzCharDb.updateOne({ id: +data.charId1 },
                    {
                        $set: {
                            'charInfo.lastPatch': +data.patchNumber,
                        },
                        $inc: {
                            'charInfo.patchCounter': 1
                        }
                    }
                )
            }
            if (data.charId2) {
                await zzzCharDb.updateOne({ id: +data.charId2 },
                    {
                        $set: {
                            'charInfo.lastPatch': +data.patchNumber,
                        },
                        $inc: {
                            'charInfo.patchCounter': 1
                        }
                    }
                )
            }
            if (data.epicCharId1) {
                await zzzCharDb.updateOne({ id: +data.epicCharId1 },
                    {
                        $set: {
                            'charInfo.lastPatch': +data.patchNumber,
                        },
                        $inc: {
                            'charInfo.patchCounter': 1
                        }
                    }
                )
            }
            if (data.epicCharId2) {
                await zzzCharDb.updateOne({ id: +data.epicCharId2 },
                    {
                        $set: {
                            'charInfo.lastPatch': +data.patchNumber,
                        },
                        $inc: {
                            'charInfo.patchCounter': 1
                        }
                    }
                )
            }
            if (data.epicCharId3) {
                await zzzCharDb.updateOne({ id: +data.epicCharId3 },
                    {
                        $set: {
                            'charInfo.lastPatch': +data.patchNumber,
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