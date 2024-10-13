import { wmatDb, zzzWmatDb } from '../..'
import path from 'path'

export const zzzWMRepository = {
    async createMaterial(name: string, days: string, files: any) {
        const mats = await zzzWmatDb.find({}).toArray()
        let lastId = mats.length > 0 ? mats[mats.length - 1].id + 1 : 1
        if (files.img1 && files.img2 && files.img3) {
            let fileName1 = files.img1.name
            let fileName2 = files.img2.name
            let fileName3 = files.img3.name
            files.img1.mv(path.resolve(__dirname, '../..', 'static/zzz/weaponMaterials', fileName1))
            files.img2.mv(path.resolve(__dirname, '../..', 'static/zzz/weaponMaterials', fileName2))
            files.img3.mv(path.resolve(__dirname, '../..', 'static/zzz/weaponMaterials', fileName3))
            const newMat = await zzzWmatDb.insertOne(
                {
                    id: lastId,
                    name: name,
                    img1: fileName1,
                    img2: fileName2,
                    img3: fileName3
                })
            return newMat
        }
        else {
            return undefined
        }
    },
    async getMaterials() {
        const mats = await zzzWmatDb.find().sort({ name: 1 }).toArray()
        return mats
    },
    async getMaterialsById(id: string) {
        const mat = await zzzWmatDb.findOne({ id: +id })
        return mat
    }
}