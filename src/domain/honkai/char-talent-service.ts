import { FileArray } from 'express-fileupload'
import { honkaiTalentRepository } from '../../repositories/honkai/talent-repo'
import { honkaiWBRepository } from '../../repositories/honkai/wb-repository'

export const honkaiTalentService = {
    async getTalents() {
        return honkaiTalentRepository.getTalents()
    },
    async getTalentById(id: string) {
        return honkaiTalentRepository.getTalentById(id)
    },
    async getWBMaterials() {
        return honkaiWBRepository.getWBMaterials()
    },
    async getWBMaterialById(id: string) {
        return honkaiWBRepository.getWBMaterialById(id)
    },
    async createTalent(name: string, days: number, files: FileArray | null | undefined) {
        return honkaiTalentRepository.createTalent(name, days, files)
    },
    async createWBMaterial(name: string, files: FileArray | null | undefined) {
        return honkaiWBRepository.createMaterial(name, files)
    }
}