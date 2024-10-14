import { bossDb, honkaiBossDb, zzzBossDb } from '../..'
import path from 'path'

export const honkaiBMRepository = {
    async createMaterial(name: string, files: any) {
        const materials = await honkaiBossDb.find({}).toArray()
        let lastId = materials.length > 0 ? materials[materials.length - 1].id + 1 : 1
        if (files.img) {
            let fileName = files.img.name
            files.img.mv(path.resolve(__dirname, '../..', 'static/honkai/bossMaterials', fileName))
            const newMaterial = await honkaiBossDb.insertOne(
                {
                    id: lastId,
                    name: name,
                    img: fileName
                })
            return newMaterial
        }
        else {
            return undefined
        }
    },
    async getBossMaterials() {
        const bm = await honkaiBossDb.find().sort({ name: 1 }).toArray()
        return bm
    },
    async getBossMaterialById(id: string) {
        const bm = await honkaiBossDb.findOne({ id: +id })
        return bm
    }
}