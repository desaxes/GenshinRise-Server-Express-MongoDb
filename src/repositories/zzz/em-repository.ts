import { enemyDb, zzzEnemyDb } from '../..'
import path from 'path'

export const zzzEMRepository = {
    async createMaterial(name: string, files: any) {
        const materials = await zzzEnemyDb.find({}).toArray()
        let lastId = materials.length > 0 ? materials[materials.length - 1].id + 1 : 1
        if (files.img1 && files.img2 && files.img3) {
            let fileName1 = files.img1.name
            let fileName2 = files.img2.name
            let fileName3 = files.img3.name
            files.img1.mv(path.resolve(__dirname, '../..', 'static/zzz/enemyMaterials', fileName1))
            files.img2.mv(path.resolve(__dirname, '../..', 'static/zzz/enemyMaterials', fileName2))
            files.img3.mv(path.resolve(__dirname, '../..', 'static/zzz/enemyMaterials', fileName3))
            const newMaterial = await zzzEnemyDb.insertOne(
                {
                    id: lastId,
                    name: name,
                    img1: fileName1,
                    img2: fileName2,
                    img3: fileName3,
                })
            return newMaterial
        }
        else {
            return undefined
        }
    },
    async getEnemyMaterials() {
        const mat = await zzzEnemyDb.find().sort({ name: 1 }).toArray()
        return mat
    },
    async getEnemyMaterialById(id: string) {
        const mat = await zzzEnemyDb.findOne({ id: +id })
        return mat
    }
}