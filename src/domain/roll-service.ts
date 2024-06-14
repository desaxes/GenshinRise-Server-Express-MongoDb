import { setQueryConditions } from '../functions'
import { rollType } from '../types'
import { RollQueryModel } from '../models/RollQueryModel'
import { RollRepository } from '../repositories/roll-repository'

export const rollService = {
    async getStandartRolls(query: RollQueryModel) {
        let lim = query.limit || 10
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await RollRepository.getStandartRolls(finalConditions, +lim, offset)
    },
    async createStandartRoll(data: rollType) {
        return RollRepository.addStandartRoll(data)
    },
    async getEventRolls(query: RollQueryModel) {
        let lim = query.limit || 10
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await RollRepository.getEventRolls(finalConditions, +lim, offset)
    },
    async createEventRoll(data: rollType) {
        return RollRepository.addEventRoll(data)
    },
    async getWeaponRolls(query: RollQueryModel) {
        let lim = query.limit || 10
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await RollRepository.getWeaponRolls(finalConditions, +lim, offset)
    },
    async createWeaponRoll(data: rollType) {
        return RollRepository.addWeaponRoll(data)
    },
}