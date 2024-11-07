import {  honkaiErollDb, honkaiGemsDb, honkaiWrollDb } from "../.."

export const honkaiGemsRepo = {
    async getRows() {
        const rows = await honkaiGemsDb.find().toArray()
        return rows[rows.length - 31] ? rows.slice(rows.length - 31) : rows
    },
    async addRow(data: any) {
        const rows = await honkaiGemsDb.find({}).toArray()
        const lastRow = rows[rows.length - 1]
        let lastId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 1
        const eRolls = await honkaiErollDb.find({ year: +data.year, month: +data.month, day: +data.day }).toArray()
        const wRolls = await honkaiWrollDb.find({ year: +data.year, month: +data.month, day: +data.day }).toArray()
        let expense = (eRolls.length + wRolls.length) * 160
        const income = expense -
            (lastRow ? (lastRow.gems + (Math.floor(lastRow.cash / 5)) * 160 + lastRow.rolls * 160) : 0) +
            (data.gems + (Math.floor(data.cash / 5)) * 160 + data.rolls * 160)
        const row = await honkaiGemsDb.insertOne({
            id: +lastId,
            year: +data.year,
            month: +data.month,
            day: +data.day,
            gems: +data.gems,
            rolls: +data.rolls,
            cash: +data.cash,
            income: +income,
            expense: +expense
        })
        return row
    }
}