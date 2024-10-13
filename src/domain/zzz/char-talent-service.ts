import { FileArray } from 'express-fileupload'
import { zzzTalentRepository } from '../../repositories/zzz/talent-repo'
import { zzzWBRepository } from '../../repositories/zzz/wb-repository'

export const zzzTalentService = {
    async getTalents() {
        return zzzTalentRepository.getTalents()
    },
    async getTalentById(id: string) {
        return zzzTalentRepository.getTalentById(id)
    },
    async getWBMaterials() {
        return zzzWBRepository.getWBMaterials()
    },
    async getWBMaterialById(id: string) {
        return zzzWBRepository.getWBMaterialById(id)
    },
    async createTalent(name: string, days: number, files: FileArray | null | undefined) {
        return zzzTalentRepository.createTalent(name, days, files)
    },
    async createWBMaterial(name: string, files: FileArray | null | undefined) {
        return zzzWBRepository.createMaterial(name, files)
    }
}