import path from "path"
import { bannerDb, erollDb, srollDb, wrollDb } from "../.."
import { newRollType, rollType } from "../../types"

export const BannerRepository = {
    async getAllBanners(limit: number, offset: number) {
        const banners = await bannerDb.find().sort({ year: -1, lmonth: -1, lday: -1 }).skip(offset).limit(limit).toArray()
        return {
            banners: banners
        }
    },
    async getBanner(id: number) {
        const banner = await bannerDb.find({ id: id }).toArray()
        return banner[0]
    },
    async addBanner(data: any, files: any) {
        const banners = await bannerDb.find({}).toArray()
        let lastId = banners.length > 0 ? banners[banners.length - 1].id + 1 : 1
        if (files.img1 && files.img2) {
            let fileName1 = files.img1.name
            let fileName2 = files.img2.name
            files.img1.mv(path.resolve(__dirname, '../..', 'static/bannerImgs', fileName1))
            files.img2.mv(path.resolve(__dirname, '../..', 'static/bannerImgs', fileName2))
            console.log(data)
            const banner = await bannerDb.insertOne({
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
            return banner
        }
        else {
            return undefined
        }
    },
}