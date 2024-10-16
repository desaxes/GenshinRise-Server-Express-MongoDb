import { CharQueryModel } from './models/CharQueryModel'
import { RollQueryModel } from './models/RollQueryModel'
import { WeaponQueryModel } from './models/WeaponQueryModel'
export const setQueryConditions = (query: CharQueryModel) => {
    let conditions = []
    if (query.name) {
        conditions.push({ name: { $regex: query.name } })
    }
    if (query.localSpecialtyId) {
        conditions.push({ localSpecialtyId: +query.localSpecialtyId })
    }
    if (query.enemyMaterialId) {
        conditions.push({ enemyMaterialId: +query.enemyMaterialId })
    }
    if (query.bossMaterialId) {
        conditions.push({ bossMaterialId: +query.bossMaterialId })
    }
    if (query.stoneTypeId) {
        conditions.push({ stoneTypeId: +query.stoneTypeId })
    }
    if (query.talentMaterialId) {
        conditions.push({ talentMaterialId: +query.talentMaterialId })
    }
    if (query.weekBossMaterialId) {
        conditions.push({ weekBossMaterialId: +query.weekBossMaterialId })
    }
    if (query.weaponId) {
        conditions.push({ weaponId: +query.weaponId })
    }
    if (query.pathId) {
        conditions.push({ pathId: +query.pathId })
    }
    if (query.region) {
        conditions.push({ region: +query.region })
    }
    if (query.sex) {
        conditions.push({ sex: +query.sex })
    }
    if (query.stars) {
        conditions.push({ stars: +query.stars })
    }
    if (query.size) {
        conditions.push({ size: +query.size })
    }
    return conditions.length ? { $and: conditions } : {}
}
export const setQueryConditionsForWeapons = (query: WeaponQueryModel) => {
    let conditions = []
    if (query.name) {
        conditions.push({ name: { $regex: query.name } })
    }
    if (query.enemyMaterialId) {
        conditions.push({ enemyMaterialId: +query.enemyMaterialId })
    }
    if (query.enemyWeaponMaterialId) {
        conditions.push({ enemyWeaponMaterialId: +query.enemyWeaponMaterialId })
    }
    if (query.weaponMaterialId) {
        conditions.push({ weaponMaterialId: +query.weaponMaterialId })
    }
    if (query.weaponId) {
        conditions.push({ weaponId: +query.weaponId })
    }
    if (query.stars) {
        conditions.push({ stars: +query.stars })
    }
    return conditions.length ? { $and: conditions } : {}
}
export const setQueryForRolls = (query: any) => {
    let conditions = []
    if (query.year) {
        conditions.push({ year: +query.year })
    }
    if (query.month) {
        conditions.push({ month: +query.month })
    }
    if (query.day) {
        conditions.push({ day: +query.day })
    }
    return conditions.length ? { $and: conditions } : {}
}