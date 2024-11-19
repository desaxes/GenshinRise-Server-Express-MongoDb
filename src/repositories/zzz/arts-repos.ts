import path from "path"
import { zzzArtsDb } from "../.."

export const zzzArtsRepo = {
    async getArts() {
        const arts = await zzzArtsDb.find().sort({ name: 1 }).toArray()
        return arts
    },
    async getArtById(id: number) {
        const art = await zzzArtsDb.findOne({ id: +id })
        return art
    },
    async createArt(data: any, files: any) {
        const arts = await zzzArtsDb.find({}).toArray()
        let lastId = arts.length > 0 ? arts[arts.length - 1].id + 1 : 1
        if (files) {
            let fileName = files.img.name
            files.img.mv(path.resolve(__dirname, '../..', 'static/zzz/arts', fileName))
            const newArt = await zzzArtsDb.insertOne(
                {
                    id: lastId,
                    name: data.name,
                    img: fileName,
                    twoPartsEffect:data.twoPartsEffect,
                    fourPartsEffect:data.fourPartsEffect
                })
            return newArt
        }
        else {
            return undefined
        }
    }
}