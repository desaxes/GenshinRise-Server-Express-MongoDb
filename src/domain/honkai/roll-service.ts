import { setQueryConditions } from '../../functions'
import { rollType } from '../../types'
import { RollQueryModel } from '../../models/RollQueryModel'
import { honkaiRollRepository } from '../../repositories/honkai/roll-repository'

export const honkaiRollService = {
    async getStandartRolls(query: RollQueryModel) {
        let lim = query.limit || 10
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await honkaiRollRepository.getStandartRolls(finalConditions, +lim, offset)
    },
    async createStandartRoll(data: rollType) {
        return honkaiRollRepository.addStandartRoll(data)
    },
    async getEventRolls(query: RollQueryModel) {
        let lim = query.limit || 10
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await honkaiRollRepository.getEventRolls(finalConditions, +lim, offset)
    },
    async getEventRollsForBanner(query: any) {
        let lim = query.limit || 10
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await honkaiRollRepository.getEventRollsForBanner(finalConditions, +lim, offset, +query.year, +query.lmonth, +query.lday, +query.hmonth, +query.hday)
    },
    async getWeaponRollsForBanner(query: any) {
        let lim = query.limit || 10
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await honkaiRollRepository.getWeaponRollsForBanner(finalConditions, +lim, offset, +query.year, +query.lmonth, +query.lday, +query.hmonth, +query.hday)
    },
    async createEventRoll(data: rollType) {
        return honkaiRollRepository.addEventRoll(data)
    },
    async getWeaponRolls(query: RollQueryModel) {
        let lim = query.limit || 10
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await honkaiRollRepository.getWeaponRolls(finalConditions, +lim, offset)
    },
    async createWeaponRoll(data: rollType) {
        return honkaiRollRepository.addWeaponRoll(data)
    },
    async getStandartRollStatistic() {
        return honkaiRollRepository.getStandartRollStatistic()
    },
    async getEventRollStatistic() {
        return honkaiRollRepository.getEventRollStatistic()
    },
    async getWeaponRollStatistic() {
        return honkaiRollRepository.getWeaponRollStatistic()
    }

}