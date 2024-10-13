import { FileArray } from 'express-fileupload'
import { setQueryConditions } from '../../functions'
import { CharQueryModel } from '../../models/CharQueryModel'
import { charRepository } from '../../repositories/genshin/char-repo'
import { char, newChar, updateChar } from '../../types'
import { zzzCharRepository } from '../../repositories/zzz/char-repo'

export const zzzCharacterService = {
    // Добавление персонажей в базу
    async getChars(query: any) {
        let lim = query.limit || 5
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await zzzCharRepository.getChars(finalConditions, +lim, offset)
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
        return await charRepository.getCharsFromCol(finalConditions, +lim, offset)
    },
    async getCharByIdFromCol(id: string) {
        return charRepository.getCharByIdFromCol(id)
    },
    async addCharToCol(data: newChar) {
        return charRepository.addCharToCol(data)
    },
    // Добавление персонажей в прокачку
    async getCharsFromRise(query: CharQueryModel) {
        let lim = query.limit || 5
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await charRepository.getCharsFromRise(finalConditions, +lim, offset)
    },
    async getCharByIdFromRise(id: string) {
        return charRepository.getCharByIdFromRise(id)
    },
    async addCharToRise(data: newChar) {
        return charRepository.addCharToRise(data)
    },
    async updateCharToRise(data: updateChar) {
        return charRepository.updateCharRise(data)
    },
    async removeCharFromCol(id: string) {
        return charRepository.removeCharfromCol(id)
    },
    async removeCharFromRise(id: string) {
        return charRepository.removeCharfromRise(id)
    },
    async getCharStat(){
        return charRepository.getCharStat()
    }
}