import express, { Response } from 'express'
import { RequestWithBody, RequestWithQuery } from '../api-types'
import { StatusCodes } from '../StatusCodes'
import { InsertOneResult } from 'mongodb'
import { rollType } from '../types'
import { RollQueryModel } from '../models/RollQueryModel'
import { rollService } from '../domain/roll-service'

export const rollRouter = () => {
    const router = express.Router()
    router.get('/standart',
        async (req: RequestWithQuery<RollQueryModel>, res: Response<any>) => {
            try {
                let rolls = await rollService.getStandartRolls(req.query)
                res.json(rolls).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.post('/standart',
        async (req: RequestWithBody<rollType>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                const newRoll = await rollService.createStandartRoll(req.body)
                if (newRoll) { res.status(StatusCodes.CREATED).json(newRoll) }
                else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: 'error' })
                }
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    router.get('/event',
        async (req: RequestWithQuery<RollQueryModel>, res: Response<any>) => {
            try {
                let rolls = await rollService.getEventRolls(req.query)
                res.json(rolls).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.post('/event',
        async (req: RequestWithBody<rollType>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                const newRoll = await rollService.createEventRoll(req.body)
                if (newRoll) { res.status(StatusCodes.CREATED).json(newRoll) }
                else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: 'error' })
                }
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    router.get('/weapon',
        async (req: RequestWithQuery<RollQueryModel>, res: Response<any>) => {
            try {
                let rolls = await rollService.getWeaponRolls(req.query)
                res.json(rolls).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.post('/weapon',
        async (req: RequestWithBody<rollType>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                const newRoll = await rollService.createWeaponRoll(req.body)
                if (newRoll) { res.status(StatusCodes.CREATED).json(newRoll) }
                else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: 'error' })
                }
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    return router
}