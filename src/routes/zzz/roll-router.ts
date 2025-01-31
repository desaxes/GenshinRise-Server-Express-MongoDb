import express, { Request, Response } from 'express'
import { RequestWithBody, RequestWithQuery } from '../../api-types'
import { StatusCodes } from '../../StatusCodes'
import { InsertOneResult } from 'mongodb'
import { rollType } from '../../types'
import { RollQueryModel } from '../../models/RollQueryModel'
import { rollService } from '../../domain/genshin/roll-service'
import { zzzRollService } from '../../domain/zzz/roll-service'

export const zzzRollRouter = () => {
    const router = express.Router()
    router.get('/standart',
        async (req: RequestWithQuery<RollQueryModel>, res: Response<any>) => {
            try {
                let rolls = await zzzRollService.getStandartRolls(req.query)
                res.json(rolls).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.post('/standart',
        async (req: RequestWithBody<rollType>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                const newRoll = await zzzRollService.createStandartRoll(req.body)
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
                let rolls = await zzzRollService.getEventRolls(req.query)
                res.json(rolls).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/event/banner',
        async (req: RequestWithQuery<RollQueryModel>, res: Response<any>) => {
            try {
                let rolls = await zzzRollService.getEventRollsForBanner(req.query)
                res.json(rolls).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/weapon/banner',
        async (req: RequestWithQuery<RollQueryModel>, res: Response<any>) => {
            try {
                let rolls = await zzzRollService.getWeaponRollsForBanner(req.query)
                res.json(rolls).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.post('/event',
        async (req: RequestWithBody<rollType>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                const newRoll = await zzzRollService.createEventRoll(req.body)
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
                let rolls = await zzzRollService.getWeaponRolls(req.query)
                res.json(rolls).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.post('/weapon',
        async (req: RequestWithBody<rollType>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                const newRoll = await zzzRollService.createWeaponRoll(req.body)
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
                let rolls = await zzzRollService.getStandartRollStatistic()
                res.json(rolls).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/event/stat',
        async (req: Request, res: Response<any>) => {
            try {
                let rolls = await zzzRollService.getEventRollStatistic()
                res.json(rolls).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/weapon/stat',
        async (req: Request, res: Response<any>) => {
            try {
                let rolls = await zzzRollService.getWeaponRollStatistic()
                res.json(rolls).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    return router
}