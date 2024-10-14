import { FileArray } from 'express-fileupload'
import { honkaiBMRepository } from '../../repositories/honkai/bm-repository'
import { honkaiEMRepository } from '../../repositories/honkai/em-repository'

export const honkaiLvlUpService = {
    async getBossMaterials() {
        return honkaiBMRepository.getBossMaterials()
    },
    async getBossMaterialById(id: string) {
        return honkaiBMRepository.getBossMaterialById(id)
    },
    async getEnemyMaterials() {
        return honkaiEMRepository.getEnemyMaterials()
    },
    async getEnemyMaterialById(id: string) {
        return honkaiEMRepository.getEnemyMaterialById(id)
    },
    async createEnemyMaterial(name: string, files: FileArray | null | undefined) {
        return honkaiEMRepository.createMaterial(name, files)
    },
    async createBossMaterial(name: string, files: FileArray | null | undefined) {
        return honkaiBMRepository.createMaterial(name, files)
    },

}