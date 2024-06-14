import { FileArray } from 'express-fileupload'
import { talentRepository } from '../repositories/talent-repo'
import { WBRepository } from '../repositories/wb-repository'

export const talentService = {
    async getTalents() {
        return talentRepository.getTalents()
    },
    async getTalentById(id: string) {
        return talentRepository.getTalentById(id)
    },
    async getWBMaterials() {
        return WBRepository.getWBMaterials()
    },
    async getWBMaterialById(id: string) {
        return WBRepository.getWBMaterialById(id)
    },
    async createTalent(name: string, days: number, files: FileArray | null | undefined) {
        return talentRepository.createTalent(name, days, files)
    },
    async createWBMaterial(name: string, files: FileArray | null | undefined) {
        return WBRepository.createMaterial(name, files)
    }
}