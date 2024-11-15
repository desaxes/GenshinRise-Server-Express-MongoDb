import { FileArray } from 'express-fileupload'
import { setQueryConditionsForWeapons } from '../../functions'
import { newWeapon, updateWeapon, updateWeaponDataType, weaponType } from '../../types'
import { WeaponQueryModel } from '../../models/WeaponQueryModel'
import { weaponRepository } from '../../repositories/genshin/weapon-repo'
import { zzzWeaponRepository } from '../../repositories/zzz/weapon-repo'

export const zzzWeaponService = {
    // Добавление оружия в базу
    async getWeapons(query: any) {
        let lim = query.limit || 5
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditionsForWeapons(query)
        return await zzzWeaponRepository.getWeapons(finalConditions, +lim, offset)
    },
    async getWeaponById(id: string) {
        return zzzWeaponRepository.getWeaponById(id)
    },
    async createWeapon(data: weaponType, files: FileArray | null | undefined) {
        return zzzWeaponRepository.createWeapon(data, files)
    },
    // Добавление оружия в коллекцию
    async getWeaponsFromCol(query: WeaponQueryModel) {
        let lim = query.limit || 5
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditionsForWeapons(query)
        return await zzzWeaponRepository.getWeaponsFromCol(finalConditions, +lim, offset)
    },
    async getWeaponFromColById(id: string) {
        return zzzWeaponRepository.getWeaponByIdFromCol(id)
    },
    async addWeaponToCol(data: newWeapon) {
        return zzzWeaponRepository.addWeaponToCol(data)
    },
    // Добавление оружия в прокачку
    async getWeaponsFromRise(query: WeaponQueryModel) {
        let lim = query.limit || 5
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditionsForWeapons(query)
        return await zzzWeaponRepository.getWeaponsFromRise(finalConditions, +lim, offset)
    },
    async getWeaponByIdFromRise(id: string) {
        return zzzWeaponRepository.getWeaponByIdFromRise(id)
    },
    async addWeaponToRise(data: newWeapon) {
        return zzzWeaponRepository.addWeaponToRise(data)
    },
    async updateWeaponToRise(data: updateWeapon) {
        return zzzWeaponRepository.updateWeaponRise(data)
    },
    async removeWeaponFromCol(id: string) {
        return zzzWeaponRepository.removeWeaponfromCol(id)
    },
    async removeWeaponFromRise(id: string) {
        return zzzWeaponRepository.removeWeaponfromRise(id)
    },
    async updateWeaponInfo(data: updateWeaponDataType) {
        return zzzWeaponRepository.updateWeaponInfo(data)
    }
}