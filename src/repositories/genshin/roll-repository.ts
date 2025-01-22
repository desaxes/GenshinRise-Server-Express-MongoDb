import { erollDb, srollDb, wrollDb } from "../.."
import { newRollType, rollType } from "../../types"

export const RollRepository = {
    async getStandartRolls(finalConditions: any, limit: number, offset: number) {
        const rollCounter = (await srollDb.find<newRollType>(finalConditions).toArray()).length
        const rolls = await srollDb.find().sort({ id: -1 }).skip(offset).limit(limit).toArray()
        let indexes = []
        let epicIndexes = []
        let legs = []
        let prev = 0
        let epicPrev = 0
        let counter = 0
        for (let i = 0; i < rolls.length; i++) {
            if (rolls[rolls.length - i - 1].stars === 4) {
                epicIndexes.push(i + 1 - epicPrev)
                epicPrev = i + 1
            }
            if (rolls[rolls.length - i - 1].stars === 5) {
                indexes.push(i + 1 - prev)
                legs.push({
                    roll: i + 1 - prev,
                    img: rolls[rolls.length - i - 1].img,
                    isChar: rolls[rolls.length - i - 1].isChar
                })
                prev = i + 1
                counter++
                epicIndexes.push(i + 1 - epicPrev)
                epicPrev = i + 1
            }
        }
        return {
            rolls: rolls,
            total: rollCounter,
            middle: Math.floor(indexes.reduce((a, b) => a + b, 0) / counter),
            epicMiddle: Math.floor(epicIndexes.reduce((a, b) => a + b, 0) / epicIndexes.length),
            legs: legs
        }
    },
    async getStandartRollStatistic() {
        const rolls = await srollDb.aggregate([{ $group: { _id: { img: "$img", stars: "$stars", isChar: "$isChar" }, count: { $sum: 1 } } }, { $sort: { '_id.stars': -1, '_id.isChar': -1 } }]).toArray()
        return rolls
    },
    async getEventRollStatistic() {
        const rolls = await erollDb.aggregate([{ $group: { _id: { img: "$img", stars: "$stars", isChar: "$isChar" }, count: { $sum: 1 } } }, { $sort: { '_id.stars': -1, '_id.isChar': -1 } }]).toArray()
        return rolls
    },
    async getWeaponRollStatistic() {
        const rolls = await wrollDb.aggregate([{ $group: { _id: { img: "$img", stars: "$stars", isChar: "$isChar" }, count: { $sum: 1 } } }, { $sort: { '_id.stars': -1, '_id.isChar': -1 } }]).toArray()
        return rolls
    },
    async addStandartRoll(data: rollType) {
        const rolls = await srollDb.find({}).toArray()
        let lastId = rolls.length > 0 ? rolls[rolls.length - 1].id + 1 : 1
        const roll = await srollDb.insertOne({
            id: lastId,
            year: +data.year,
            month: +data.month,
            day: +data.day,
            isChar: data.isChar,
            rewardId: +data.rewardId,
            rewardName: data.rewardName,
            stars: +data.stars,
            img: data.img
        })
        return roll
    },
    async getEventRolls(finalConditions: any, limit: number, offset: number) {
        const rollCounter = (await erollDb.find<newRollType>(finalConditions).toArray()).length
        const rolls = await erollDb.find().sort({ id: -1 }).skip(offset).limit(limit).toArray()
        let indexes = []
        let epicIndexes = []
        let legs = []
        let prev = 0
        let epicPrev = 0
        let counter = 0
        for (let i = 0; i < rolls.length; i++) {
            if (rolls[rolls.length - i - 1].stars === 4) {
                epicIndexes.push(i + 1 - epicPrev)
                epicPrev = i + 1
            }
            if (rolls[rolls.length - i - 1].stars === 5) {
                indexes.push(i + 1 - prev)
                legs.push({
                    roll: i + 1 - prev,
                    img: rolls[rolls.length - i - 1].img,
                    isChar: rolls[rolls.length - i - 1].isChar
                })
                prev = i + 1
                counter++
                epicIndexes.push(i + 1 - epicPrev)
                epicPrev = i + 1
            }
        }
        return {
            rolls: rolls,
            total: rollCounter,
            middle: Math.floor(indexes.reduce((a, b) => a + b, 0) / counter),
            epicMiddle: Math.floor(epicIndexes.reduce((a, b) => a + b, 0) / epicIndexes.length),
            legs: legs
        }
    },
    async getEventRollsForBanner(finalConditions: any, limit: number, offset: number, year: number, lmonth: number, lday: number, hmonth: number, hday: number) {
        // const rollCounter = (await erollDb.find<newRollType>(finalConditions).toArray()).length
        const rolls = await erollDb.find({ month: { $in: [lmonth, hmonth] }, stars: { $in: [4, 5] } }).sort({ stars: -1, isChar: -1, rewardId: -1 }).skip(offset).limit(limit).toArray()
        const rollCounter = await erollDb.find({ month: { $in: [lmonth, hmonth] }, stars: { $in: [3, 4, 5] } }).sort({ stars: -1, isChar: -1, rewardId: -1 }).skip(offset).limit(limit).toArray()
        let sort
        let sortCounter
        if (lmonth === hmonth) {
            sort = rolls.filter(e => e.day >= lday && e.day <= hday && e.year === year)
        }
        else {
            if (hmonth != 1) {
                const rolls1 = rolls.filter(e => e.month === lmonth && e.day >= lday && e.year === year)
                const rolls2 = rolls.filter(e => e.month === hmonth && e.day <= hday && e.year === year)
                sort = rolls1.concat(rolls2)
            }
            else {
                const rolls1 = rolls.filter(e => e.month === lmonth && e.day >= lday && e.year === year)
                const rolls2 = rolls.filter(e => e.month === hmonth && e.day <= hday && e.year === (year + 1))
                sort = rolls1.concat(rolls2)
            }
        }
        if (lmonth === hmonth) {
            sortCounter = rollCounter.filter(e => e.day >= lday && e.day <= hday && e.year === year)
        }
        else {
            if (hmonth != 1) {
                const rolls1 = rollCounter.filter(e => e.month === lmonth && e.day >= lday && e.year === year)
                const rolls2 = rollCounter.filter(e => e.month === hmonth && e.day <= hday && e.year === year)
                sortCounter = rolls1.concat(rolls2)
            }
            else {
                const rolls1 = rollCounter.filter(e => e.month === lmonth && e.day >= lday && e.year === year)
                const rolls2 = rollCounter.filter(e => e.month === hmonth && e.day <= hday && e.year === (year + 1))
                sortCounter = rolls1.concat(rolls2)
            }
        }
        return {
            rolls: sort,
            total: sortCounter.length
        }
    },
    async addEventRoll(data: rollType) {
        const rolls = await erollDb.find({}).toArray()
        let lastId = rolls.length > 0 ? rolls[rolls.length - 1].id + 1 : 1
        const roll = await erollDb.insertOne({
            id: lastId,
            year: data.year,
            month: data.month,
            day: data.day,
            isChar: data.isChar,
            rewardId: data.rewardId,
            rewardName: data.rewardName,
            stars: +data.stars,
            img: data.img
        })
        return roll
    },
    async getWeaponRolls(finalConditions: any, limit: number, offset: number) {
        const rollCounter = (await wrollDb.find<newRollType>(finalConditions).toArray()).length
        const rolls = await wrollDb.find().sort({ id: -1 }).skip(offset).limit(limit).toArray()
        let indexes = []
        let epicIndexes = []
        let legs = []
        let prev = 0
        let epicPrev = 0
        let counter = 0
        for (let i = 0; i < rolls.length; i++) {
            if (rolls[rolls.length - i - 1].stars === 4) {
                epicIndexes.push(i + 1 - epicPrev)
                epicPrev = i + 1
            }
            if (rolls[rolls.length - i - 1].stars === 5) {
                indexes.push(i + 1 - prev)
                legs.push({
                    roll: i + 1 - prev,
                    img: rolls[rolls.length - i - 1].img,
                    isChar: rolls[rolls.length - i - 1].isChar
                })
                prev = i + 1
                counter++
                epicIndexes.push(i + 1 - epicPrev)
                epicPrev = i + 1
            }
        }
        return {
            rolls: rolls,
            total: rollCounter,
            middle: Math.floor(indexes.reduce((a, b) => a + b, 0) / counter),
            epicMiddle: Math.floor(epicIndexes.reduce((a, b) => a + b, 0) / epicIndexes.length),
            legs: legs
        }
    },
    async getWeaponRollsForBanner(finalConditions: any, limit: number, offset: number, year: number, lmonth: number, lday: number, hmonth: number, hday: number) {
        // const rollCounter = (await erollDb.find<newRollType>(finalConditions).toArray()).length
        const rolls = await wrollDb.find({  month: { $in: [lmonth, hmonth] }, stars: { $in: [4, 5] } }).sort({ stars: -1, isChar: -1, rewardId: -1 }).skip(offset).limit(limit).toArray()
        const rollCounter = await wrollDb.find({  month: { $in: [lmonth, hmonth] }, stars: { $in: [3, 4, 5] } }).sort({ stars: -1, isChar: -1, rewardId: -1 }).skip(offset).limit(limit).toArray()
        let sort
        let sortCounter
        if (lmonth === hmonth) {
            sort = rolls.filter(e => e.day >= lday && e.day <= hday && e.year === year)
        }
        else {
            if (hmonth != 1) {
                const rolls1 = rolls.filter(e => e.month === lmonth && e.day >= lday && e.year === year)
                const rolls2 = rolls.filter(e => e.month === hmonth && e.day <= hday && e.year === year)
                sort = rolls1.concat(rolls2)
            }
            else {
                const rolls1 = rolls.filter(e => e.month === lmonth && e.day >= lday && e.year === year)
                const rolls2 = rolls.filter(e => e.month === hmonth && e.day <= hday && e.year === (year + 1))
                sort = rolls1.concat(rolls2)
            }
        }
        if (lmonth === hmonth) {
            sortCounter = rollCounter.filter(e => e.day >= lday && e.day <= hday && e.year === year)
        }
        else {
            if (hmonth != 1) {
                const rolls1 = rollCounter.filter(e => e.month === lmonth && e.day >= lday && e.year === year)
                const rolls2 = rollCounter.filter(e => e.month === hmonth && e.day <= hday && e.year === year)
                sortCounter = rolls1.concat(rolls2)
            }
            else {
                const rolls1 = rollCounter.filter(e => e.month === lmonth && e.day >= lday && e.year === year)
                const rolls2 = rollCounter.filter(e => e.month === hmonth && e.day <= hday && e.year === (year + 1))
                sortCounter = rolls1.concat(rolls2)
            }
        }
        return {
            rolls: sort,
            total: sortCounter.length
        }
    },
    async addWeaponRoll(data: rollType) {
        const rolls = await wrollDb.find({}).toArray()
        let lastId = rolls.length > 0 ? rolls[rolls.length - 1].id + 1 : 1
        const roll = await wrollDb.insertOne({
            id: lastId,
            year: data.year,
            month: data.month,
            day: data.day,
            isChar: data.isChar,
            rewardId: data.rewardId,
            rewardName: data.rewardName,
            stars: +data.stars,
            img: data.img
        })
        return roll
    },
}