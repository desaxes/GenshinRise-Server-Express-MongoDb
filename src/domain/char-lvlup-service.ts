import { FileArray } from 'express-fileupload'
import { stoneRepository } from '../repositories/stone-repository'
import { EMRepository } from '../repositories/em-repository'
import { LSRepository } from '../repositories/ls-repository'
import { BMRepository } from '../repositories/bm-repository'
import { timerRepository } from '../repositories/timer-repo'

export const lvlUpService = {
    async getTimers() {
        return timerRepository.getTimers()
    },
    async getStones() {
        return stoneRepository.getStones()
    },
    async getStoneById(id: string) {
        return stoneRepository.getStoneById(id)
    },
    async getBossMaterials() {
        return BMRepository.getBossMaterials()
    },
    async getBossMaterialById(id: string) {
        return BMRepository.getBossMaterialById(id)
    },
    async getEnemyMaterials() {
        return EMRepository.getEnemyMaterials()
    },
    async getEnemyMaterialById(id: string) {
        return EMRepository.getEnemyMaterialById(id)
    },
    async getLocalSpecialtys() {
        return LSRepository.getLocalSpecialtys()
    },
    async getLocalSpecialtyById(id: string) {
        return LSRepository.getLocalSpecialtyById(id)
    },
    async createTimer(id: string) {
        return timerRepository.createTimer(id)
    },
    async createEnemyMaterial(name: string, files: FileArray | null | undefined) {
        return EMRepository.createMaterial(name, files)
    },
    async createStone(name: string, files: FileArray | null | undefined) {
        return stoneRepository.createMaterial(name, files)
    },
    async createLocalSpecialty(name: string, regionId: string, files: FileArray | null | undefined) {
        return LSRepository.createMaterial(name, regionId, files)
    },
    async createBossMaterial(name: string, files: FileArray | null | undefined) {
        return BMRepository.createMaterial(name, files)
    },
    async removeTimer(id:string){
        return timerRepository.removeTimer(id)
    }
}