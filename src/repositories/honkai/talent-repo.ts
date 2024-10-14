import { honkaiTalentDb, talentDb, zzzTalentDb } from '../..'
import path from 'path'

export const honkaiTalentRepository = {
    async createTalent(name: string, days: number, files: any) {
        const talents = await honkaiTalentDb.find({}).toArray()
        let lastId = talents.length > 0 ? talents[talents.length - 1].id + 1 : 1
        if (files.img1 && files.img2 && files.img3) {
            let fileName1 = files.img1.name
            let fileName2 = files.img2.name
            let fileName3 = files.img3.name
            files.img1.mv(path.resolve(__dirname, '../..', 'static/honkai/talents', fileName1))
            files.img2.mv(path.resolve(__dirname, '../..', 'static/honkai/talents', fileName2))
            files.img3.mv(path.resolve(__dirname, '../..', 'static/honkai/talents', fileName3))
            const newTalent = await honkaiTalentDb.insertOne(
                {
                    id: lastId,
                    name: name,
                    img1: fileName1,
                    img2: fileName2,
                    img3: fileName3,
                })
            return newTalent
        }
        else {
            return undefined
        }
    },
    async getTalents() {
        const talents = await honkaiTalentDb.find().sort({ name: 1 }).toArray()
        return talents
    },
    async getTalentById(id: string) {
        const talent = await honkaiTalentDb.findOne({ id: +id })
        return talent
    }
}