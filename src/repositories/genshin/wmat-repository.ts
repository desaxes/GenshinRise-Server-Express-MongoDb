import { wmatDb } from '../..'
import path from 'path'

export const WMRepository = {
    async createMaterial(name: string, days: string, files: any) {
        const mats = await wmatDb.find({}).toArray()
        let lastId = mats.length > 0 ? mats[mats.length - 1].id + 1 : 1
        if (files.img1 && files.img2 && files.img3 && files.img4) {
            let fileName1 = files.img1.name
            let fileName2 = files.img2.name
            let fileName3 = files.img3.name
            let fileName4 = files.img4.name
            files.img1.mv(path.resolve(__dirname, '../..', 'static/weaponMaterials', fileName1))
            files.img2.mv(path.resolve(__dirname, '../..', 'static/weaponMaterials', fileName2))
            files.img3.mv(path.resolve(__dirname, '../..', 'static/weaponMaterials', fileName3))
            files.img4.mv(path.resolve(__dirname, '../..', 'static/weaponMaterials', fileName4))
            const newMat = await wmatDb.insertOne(
                {
                    id: lastId,
                    name: name,
                    days: +days,
                    img1: fileName1,
                    img2: fileName2,
                    img3: fileName3,
                    img4: fileName4,
                })
            return newMat
        }
        else {
            return undefined
        }
    },
    async getMaterials() {
        const mats = await wmatDb.find().sort({ name: 1 }).toArray()
        return mats
    },
    async getMaterialsById(id: string) {
        const mat = await wmatDb.findOne({ id: +id })
        return mat
    }
}