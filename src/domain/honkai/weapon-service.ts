import { FileArray } from 'express-fileupload'
import { setQueryConditionsForWeapons } from '../../functions'
import { newWeapon, updateWeapon, updateWeaponDataType, weaponType } from '../../types'
import { WeaponQueryModel } from '../../models/WeaponQueryModel'
import { honkaiWeaponRepository } from '../../repositories/honkai/weapon-repo'

export const honkaiWeaponService = {
    // Добавление оружия в базу
    async getWeapons(query: any) {
        let lim = query.limit || 5
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditionsForWeapons(query)
        return await honkaiWeaponRepository.getWeapons(finalConditions, +lim, offset)
    },
    async getWeaponById(id: string) {
        return honkaiWeaponRepository.getWeaponById(id)
    },
    async createWeapon(data: weaponType, files: FileArray | null | undefined) {
        return honkaiWeaponRepository.createWeapon(data, files)
    },
    // Добавление оружия в коллекцию
    async getWeaponsFromCol(query: WeaponQueryModel) {
        let lim = query.limit || 5
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditionsForWeapons(query)
        return await honkaiWeaponRepository.getWeaponsFromCol(finalConditions, +lim, offset)
    },
    async getWeaponFromColById(id: string) {
        return honkaiWeaponRepository.getWeaponByIdFromCol(id)
    },
    async addWeaponToCol(data: newWeapon) {
        return honkaiWeaponRepository.addWeaponToCol(data)
    },
    // Добавление оружия в прокачку
    async getWeaponsFromRise(query: WeaponQueryModel) {
        let lim = query.limit || 5
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditionsForWeapons(query)
        return await honkaiWeaponRepository.getWeaponsFromRise(finalConditions, +lim, offset)
    },
    async getWeaponByIdFromRise(id: string) {
        return honkaiWeaponRepository.getWeaponByIdFromRise(id)
    },
    async addWeaponToRise(data: newWeapon) {
        return honkaiWeaponRepository.addWeaponToRise(data)
    },
    async updateWeaponToRise(data: updateWeapon) {
        return honkaiWeaponRepository.updateWeaponRise(data)
    },
    async removeWeaponFromCol(id: string) {
        return honkaiWeaponRepository.removeWeaponfromCol(id)
    },
    async removeWeaponFromRise(id: string) {
        return honkaiWeaponRepository.removeWeaponfromRise(id)
    },
    async updateWeaponInfo(data: updateWeaponDataType) {
        return honkaiWeaponRepository.updateWeaponInfo(data)
    }
}