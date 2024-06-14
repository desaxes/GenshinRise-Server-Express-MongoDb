import { FileArray } from 'express-fileupload'
import { WMRepository } from '../repositories/wmat-repository'
import { EWMRepository } from '../repositories/ewmat-repository'

export const weaponLvlUpService = {
    async getWeaponMaterials() {
        return WMRepository.getMaterials()
    },
    async getWeaponMaterialById(id: string) {
        return WMRepository.getMaterialsById(id)
    },
    async getEWMaterials() {
        return EWMRepository.getMaterials()
    },
    async getEWMaterialById(id: string) {
        return EWMRepository.getMaterialById(id)
    },
    async createWeaponMaterial(name: string, days: string, files: FileArray | null | undefined) {
        return WMRepository.createMaterial(name, days, files)
    },
    async createEWMaterial(name: string, files: FileArray | null | undefined) {
        return EWMRepository.createMaterial(name, files)
    },
}