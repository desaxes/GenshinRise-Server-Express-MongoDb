import { bossDb, zzzBossDb } from '../..'
import path from 'path'

export const zzzBMRepository = {
    async createMaterial(name: string, files: any) {
        const materials = await zzzBossDb.find({}).toArray()
        let lastId = materials.length > 0 ? materials[materials.length - 1].id + 1 : 1
        if (files.img) {
            let fileName = files.img.name
            files.img.mv(path.resolve(__dirname, '../..', 'static/zzz/bossMaterials', fileName))
            const newMaterial = await zzzBossDb.insertOne(
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
        const bm = await zzzBossDb.find().sort({ name: 1 }).toArray()
        return bm
    },
    async getBossMaterialById(id: string) {
        const bm = await zzzBossDb.findOne({ id: +id })
        return bm
    }
}