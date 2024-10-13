import { specDb } from '../..'
import path from 'path'

export const LSRepository = {
    async createMaterial(name: string, regionId: string, files: any) {
        const materials = await specDb.find({}).toArray()
        let lastId = materials.length > 0 ? materials[materials.length - 1].id + 1 : 1
        if (files.img) {
            let fileName = files.img.name
            console.log(files.img)
            files.img.mv(path.resolve(__dirname, '../..', 'static/localSpecialtys', fileName))
            const newMaterial = await specDb.insertOne(
                {
                    id: lastId,
                    name: name,
                    regionId: regionId,
                    img: fileName
                })
            return newMaterial
        }
        else {
            return undefined
        }
    },
    async getLocalSpecialtys() {
        const ls = await specDb.find().sort({ name: 1 }).toArray()
        return ls
    },
    async getLocalSpecialtyById(id:string) {
        const ls = await specDb.findOne({id:+id})
        return ls
    }
}