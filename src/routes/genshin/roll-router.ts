import express, { Request, Response } from 'express'
import { RequestWithBody, RequestWithQuery } from '../../api-types'
import { StatusCodes } from '../../StatusCodes'
import { InsertOneResult } from 'mongodb'
import { rollType } from '../../types'
import { RollQueryModel } from '../../models/RollQueryModel'
import { rollService } from '../../domain/genshin/roll-service'

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
    router.get('/event/banner',
        async (req: RequestWithQuery<RollQueryModel>, res: Response<any>) => {
            try {
                let rolls = await rollService.getEventRollsForBanner(req.query)
                res.json(rolls).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/weapon/banner',
        async (req: RequestWithQuery<RollQueryModel>, res: Response<any>) => {
            try {
                let rolls = await rollService.getWeaponRollsForBanner(req.query)
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
    router.get('/standart/stat',
        async (req: Request, res: Response<any>) => {
            try {
                let rolls = await rollService.getStandartRollStatistic()
                res.json(rolls).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/event/stat',
        async (req: Request, res: Response<any>) => {
            try {
                let rolls = await rollService.getEventRollStatistic()
                res.json(rolls).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/weapon/stat',
        async (req: Request, res: Response<any>) => {
            try {
                let rolls = await rollService.getWeaponRollStatistic()
                res.json(rolls).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    return router
}