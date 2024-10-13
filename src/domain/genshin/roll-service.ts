import { setQueryConditions } from '../../functions'
import { rollType } from '../../types'
import { RollQueryModel } from '../../models/RollQueryModel'
import { RollRepository } from '../../repositories/genshin/roll-repository'

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
    async getEventRollsForBanner(query: any) {
        let lim = query.limit || 10
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await RollRepository.getEventRollsForBanner(finalConditions, +lim, offset, +query.year, +query.lmonth, +query.lday, +query.hmonth, +query.hday)
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
    async getStandartRollStatistic() {
        return RollRepository.getStandartRollStatistic()
    },
    async getEventRollStatistic() {
        return RollRepository.getEventRollStatistic()
    },
    async getWeaponRollStatistic() {
        return RollRepository.getWeaponRollStatistic()
    }

}