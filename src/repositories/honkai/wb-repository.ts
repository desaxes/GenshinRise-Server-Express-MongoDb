import { honkaiWBossDb, zzzWBossDb } from '../..'
import path from 'path'

export const honkaiWBRepository = {
    async createMaterial(name: string, files: any) {
        const materials = await honkaiWBossDb.find({}).toArray()
        let lastId = materials.length > 0 ? materials[materials.length - 1].id + 1 : 1
        if (files.img) {
            let fileName = files.img.name
            files.img.mv(path.resolve(__dirname, '../..', 'static/honkai/weekBossMaterials', fileName))
            const newMaterial = await honkaiWBossDb.insertOne(
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
    async getWBMaterials() {
        const mat = await honkaiWBossDb.find().sort({ name: 1 }).toArray()
        return mat
    },
    async getWBMaterialById(id: string) {
        const mat = await honkaiWBossDb.findOne({ id: +id })
        return mat
    }
}