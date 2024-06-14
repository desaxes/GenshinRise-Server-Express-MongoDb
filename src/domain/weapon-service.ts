import { FileArray } from 'express-fileupload'
import { setQueryConditionsForWeapons } from '../functions'
import {newWeapon, updateWeapon, weaponType } from '../types'
import { WeaponQueryModel } from '../models/WeaponQueryModel'
import { weaponRepository } from '../repositories/weapon-repo'

export const weaponService = {
    // Добавление оружия в базу
    async getWeapons(query: WeaponQueryModel) {
        let lim = query.limit || 5
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditionsForWeapons(query)
        return await weaponRepository.getWeapons(finalConditions, +lim, offset)
    },
    async getWeaponById(id: string) {
        return weaponRepository.getWeaponById(id)
    },
    async getMaxValues() {
        return weaponRepository.getMaxValues()
    },
    async addMaxValues(data: updateWeapon) {
        return weaponRepository.addMaxValues(data)
    },
    async createWeapon(data: weaponType, files: FileArray | null | undefined) {
        return weaponRepository.createWeapon(data, files)
    },
    // Добавление оружия в коллекцию
    async getWeaponsFromCol(query: WeaponQueryModel) {
        let lim = query.limit || 5
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditionsForWeapons(query)
        return await weaponRepository.getWeaponsFromCol(finalConditions, +lim, offset)
    },
    async getWeaponFromColById(id: string) {
        return weaponRepository.getWeaponByIdFromCol(id)
    },
    async addWeaponToCol(data: newWeapon) {
        return weaponRepository.addWeaponToCol(data)
    },
    // Добавление оружия в прокачку
    async getWeaponsFromRise(query: WeaponQueryModel) {
        let lim = query.limit || 5
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditionsForWeapons(query)
        return await weaponRepository.getWeaponsFromRise(finalConditions, +lim, offset)
    },
    async getWeaponByIdFromRise(id: string) {
        return weaponRepository.getWeaponByIdFromRise(id)
    },
    async addWeaponToRise(data: newWeapon) {
        return weaponRepository.addWeaponToRise(data)
    },
    async updateWeaponToRise(data: updateWeapon) {
        return weaponRepository.updateWeaponRise(data)
    },
    async removeWeaponFromCol(id: string) {
        return weaponRepository.removeWeaponfromCol(id)
    },
    async removeWeaponFromRise(id: string) {
        return weaponRepository.removeWeaponfromRise(id)
    },
    async removeMaxValues(id: string) {
        return weaponRepository.removeMaxValues(id)
    }
}