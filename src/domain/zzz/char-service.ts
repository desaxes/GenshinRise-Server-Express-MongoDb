import { FileArray } from 'express-fileupload'
import { setQueryConditions } from '../../functions'
import { CharQueryModel } from '../../models/CharQueryModel'
import { char, newChar, updateChar, updateCharDataType } from '../../types'
import { zzzCharRepository } from '../../repositories/zzz/char-repo'

export const zzzCharacterService = {
    // Добавление персонажей в базу
    async getChars(query: any) {
        let lim = query.limit || 5
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await zzzCharRepository.getChars(finalConditions, +lim, offset)
    },
    async getCharsWithSortByPatchNumber(query: CharQueryModel) {
        let lim = query.limit || 5
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await zzzCharRepository.getCharsWithSortByPatchNumber(finalConditions, +lim, offset)
    },
    async getCharsWithSortByPatchCounter(query: CharQueryModel) {
        let lim = query.limit || 5
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await zzzCharRepository.getCharsWithSortByPatchCounter(finalConditions, +lim, offset)
    },
    async getCharsWithSortByRelease(query: CharQueryModel) {
        let lim = query.limit || 5
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await zzzCharRepository.getCharsWithSortByRelease(finalConditions, +lim, offset)
    },
    async getCharById(id: string) {
        return zzzCharRepository.getCharById(id)
    },
    async createChar(data: char, files: FileArray | null | undefined) {
        return zzzCharRepository.createChar(data, files)
    },
    // Добавление персонажей в коллекцию
    async getCharsFromCol(query: CharQueryModel) {
        let lim = query.limit || 5
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await zzzCharRepository.getCharsFromCol(finalConditions, +lim, offset)
    },
    async getCharByIdFromCol(id: string) {
        return zzzCharRepository.getCharByIdFromCol(id)
    },
    async addCharToCol(data: newChar) {
        return zzzCharRepository.addCharToCol(data)
    },
    // Добавление персонажей в прокачку
    async getCharsFromRise(query: CharQueryModel) {
        let lim = query.limit || 5
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await zzzCharRepository.getCharsFromRise(finalConditions, +lim, offset)
    },
    async getCharByIdFromRise(id: string) {
        return zzzCharRepository.getCharByIdFromRise(id)
    },
    async addCharToRise(data: newChar) {
        return zzzCharRepository.addCharToRise(data)
    },
    async updateCharToRise(data: updateChar) {
        return zzzCharRepository.updateCharRise(data)
    },
    async removeCharFromCol(id: string) {
        return zzzCharRepository.removeCharfromCol(id)
    },
    async removeCharFromRise(id: string) {
        return zzzCharRepository.removeCharfromRise(id)
    },
    async getCharStat() {
        return zzzCharRepository.getCharStat()
    },
    async updateCharInfo(data: updateCharDataType) {
        return zzzCharRepository.updateCharInfo(data)
    },
    async getCharForWeapon(id: number) {
        return zzzCharRepository.getCharForWeapon(id)
    },
}