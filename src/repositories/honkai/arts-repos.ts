import path from "path"
import { honkaiArtsDb } from "../.."

export const honkaiArtsRepo = {
    async getArts() {
        const arts = await honkaiArtsDb.find().toArray()
        return arts
    },
    async getArtById(id: number) {
        const art = await honkaiArtsDb.findOne({ id: +id })
        return art
    },
    async createArt(data: any, files: any) {
        const arts = await honkaiArtsDb.find({}).toArray()
        let lastId = arts.length > 0 ? arts[arts.length - 1].id + 1 : 1
        if (files) {
            let fileName = files.img.name
            files.img.mv(path.resolve(__dirname, '../..', 'static/honkai/arts', fileName))
            const newArt = await honkaiArtsDb.insertOne(
                {
                    id: lastId,
                    name: data.name,
                    img: fileName,
                    twoPartsEffect: data.twoPartsEffect,
                    fourPartsEffect: data.fourPartsEffect,
                    planar: Boolean(data.planar)
                })
            return newArt
        }
        else {
            return undefined
        }
    }
}