import { stonesDb } from '../..'
import path from 'path'

export const stoneRepository = {
    async createMaterial(name: string, files: any) {
        const materials = await stonesDb.find({}).toArray()
        let lastId = materials.length > 0 ? materials[materials.length - 1].id + 1 : 1
        if (files.img1 && files.img2 && files.img3 && files.img4) {
            let fileName1 = files.img1.name
            let fileName2 = files.img2.name
            let fileName3 = files.img3.name
            let fileName4 = files.img4.name
            files.img1.mv(path.resolve(__dirname, '../..', 'static/stones', fileName1))
            files.img2.mv(path.resolve(__dirname, '../..', 'static/stones', fileName2))
            files.img3.mv(path.resolve(__dirname, '../..', 'static/stones', fileName3))
            files.img4.mv(path.resolve(__dirname, '../..', 'static/stones', fileName4))
            const newMaterial = await stonesDb.insertOne(
                {
                    id: lastId,
                    name: name,
                    img1: fileName1,
                    img2: fileName2,
                    img3: fileName3,
                    img4: fileName4
                })
            return newMaterial
        }
        else {
            console.log(files)
            return undefined
        }
    },
    async getStones() {
        const stones = await stonesDb.find().sort({ name: 1 }).toArray()
        return stones
    },
    async getStoneById(id:string) {
        const stone = await stonesDb.findOne({id:+id})
        return stone
    }
}