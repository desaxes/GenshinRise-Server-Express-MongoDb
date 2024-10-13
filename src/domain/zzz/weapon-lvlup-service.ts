import { FileArray } from 'express-fileupload'
import { zzzWMRepository } from '../../repositories/zzz/wmat-repository'

export const zzzWeaponLvlUpService = {
    async getWeaponMaterials() {
        return zzzWMRepository.getMaterials()
    },
    async getWeaponMaterialById(id: string) {
        return zzzWMRepository.getMaterialsById(id)
    },
    async createWeaponMaterial(name: string, days: string, files: FileArray | null | undefined) {
        return zzzWMRepository.createMaterial(name, days, files)
    }

}