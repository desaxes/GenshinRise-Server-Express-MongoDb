import { FileArray } from 'express-fileupload'
import { zzzBMRepository } from '../../repositories/zzz/bm-repository'
import { zzzEMRepository } from '../../repositories/zzz/em-repository'

export const zzzLvlUpService = {
    async getBossMaterials() {
        return zzzBMRepository.getBossMaterials()
    },
    async getBossMaterialById(id: string) {
        return zzzBMRepository.getBossMaterialById(id)
    },
    async getEnemyMaterials() {
        return zzzEMRepository.getEnemyMaterials()
    },
    async getEnemyMaterialById(id: string) {
        return zzzEMRepository.getEnemyMaterialById(id)
    },
    async createEnemyMaterial(name: string, files: FileArray | null | undefined) {
        return zzzEMRepository.createMaterial(name, files)
    },
    async createBossMaterial(name: string, files: FileArray | null | undefined) {
        return zzzBMRepository.createMaterial(name, files)
    },

}