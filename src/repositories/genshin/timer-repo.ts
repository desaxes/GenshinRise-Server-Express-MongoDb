import { timersDb } from '../..'

export const timerRepository = {
    async createTimer(id: string) {
        const timers = await timersDb.find({}).toArray()
        const date = new Date
        
        let lastId = timers.length > 0 ? timers[timers.length - 1].id + 1 : 1
        const timer = await timersDb.insertOne(
            {
                id: lastId,
                materialId: +id,
                time: date.getTime()
            })
        return timer
    },
    async getTimers() {
        const timers = await timersDb.find().toArray()
        return timers
    },
    async removeTimer(id: string) {
        const timer = await timersDb.deleteOne({ materialId: +id })
        return timer
    }
}