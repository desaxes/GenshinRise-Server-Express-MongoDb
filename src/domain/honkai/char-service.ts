import { FileArray } from 'express-fileupload'
import { setQueryConditions } from '../../functions'
import { CharQueryModel } from '../../models/CharQueryModel'
import { char, newChar, updateChar } from '../../types'
import { honkaiCharRepository } from '../../repositories/honkai/char-repo'

export const honkaiCharacterService = {
    // Добавление персонажей в базу
    async getChars(query: any) {
        let lim = query.limit || 5
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await honkaiCharRepository.getChars(finalConditions, +lim, offset)
    },
    async getCharById(id: string) {
        return honkaiCharRepository.getCharById(id)
    },
    async createChar(data: char, files: FileArray | null | undefined) {
        return honkaiCharRepository.createChar(data, files)
    },
    // Добавление персонажей в коллекцию
    async getCharsFromCol(query: CharQueryModel) {
        let lim = query.limit || 5
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await honkaiCharRepository.getCharsFromCol(finalConditions, +lim, offset)
    },
    async getCharByIdFromCol(id: string) {
        return honkaiCharRepository.getCharByIdFromCol(id)
    },
    async addCharToCol(data: newChar) {
        return honkaiCharRepository.addCharToCol(data)
    },
    // Добавление персонажей в прокачку
    async getCharsFromRise(query: CharQueryModel) {
        let lim = query.limit || 5
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await honkaiCharRepository.getCharsFromRise(finalConditions, +lim, offset)
    },
    async getCharByIdFromRise(id: string) {
        return honkaiCharRepository.getCharByIdFromRise(id)
    },
    async addCharToRise(data: newChar) {
        return honkaiCharRepository.addCharToRise(data)
    },
    async updateCharToRise(data: updateChar) {
        return honkaiCharRepository.updateCharRise(data)
    },
    async removeCharFromCol(id: string) {
        return honkaiCharRepository.removeCharfromCol(id)
    },
    async removeCharFromRise(id: string) {
        return honkaiCharRepository.removeCharfromRise(id)
    },
    async getCharStat() {
        return honkaiCharRepository.getCharStat()
    }
}