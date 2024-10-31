import { setQueryConditions } from '../../functions'
import { rollType } from '../../types'
import { RollQueryModel } from '../../models/RollQueryModel'
import { RollRepository } from '../../repositories/genshin/roll-repository'
import { zzzRollRepository } from '../../repositories/zzz/roll-repository'

export const zzzRollService = {
    async getStandartRolls(query: RollQueryModel) {
        let lim = query.limit || 10
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await zzzRollRepository.getStandartRolls(finalConditions, +lim, offset)
    },
    async createStandartRoll(data: rollType) {
        return zzzRollRepository.addStandartRoll(data)
    },
    async getEventRolls(query: RollQueryModel) {
        let lim = query.limit || 10
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await zzzRollRepository.getEventRolls(finalConditions, +lim, offset)
    },
    async getEventRollsForBanner(query: any) {
        let lim = query.limit || 10
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await zzzRollRepository.getEventRollsForBanner(finalConditions, +lim, offset, +query.year, +query.lmonth, +query.lday, +query.hmonth, +query.hday)
    },
    async getWeaponRollsForBanner(query: any) {
        let lim = query.limit || 10
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await zzzRollRepository.getWeaponRollsForBanner(finalConditions, +lim, offset, +query.year, +query.lmonth, +query.lday, +query.hmonth, +query.hday)
    },
    async createEventRoll(data: rollType) {
        return zzzRollRepository.addEventRoll(data)
    },
    async getWeaponRolls(query: RollQueryModel) {
        let lim = query.limit || 10
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        let finalConditions = setQueryConditions(query)
        return await zzzRollRepository.getWeaponRolls(finalConditions, +lim, offset)
    },
    async createWeaponRoll(data: rollType) {
        return zzzRollRepository.addWeaponRoll(data)
    },
    async getStandartRollStatistic() {
        return zzzRollRepository.getStandartRollStatistic()
    },
    async getEventRollStatistic() {
        return zzzRollRepository.getEventRollStatistic()
    },
    async getWeaponRollStatistic() {
        return zzzRollRepository.getWeaponRollStatistic()
    }

}