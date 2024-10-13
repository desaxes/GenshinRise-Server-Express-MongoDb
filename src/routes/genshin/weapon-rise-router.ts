import express, { Request, Response } from 'express'
import { RequestWithBody, RequestWithParams, RequestWithQuery } from '../../api-types'
import { StatusCodes } from '../../StatusCodes'
import { InsertOneResult, UpdateResult } from 'mongodb'
import { newWeapon, updateWeapon } from '../../types'
import { URIParamsModel } from '../../models/URIParamsModel'
import { WeaponQueryModel } from '../../models/WeaponQueryModel'
import { weaponService } from '../../domain/genshin/weapon-service'

export const weaponRiseRouter = () => {
    const router = express.Router()
    router.get('/',
        async (req: RequestWithQuery<WeaponQueryModel>, res: Response<any>) => {
            try {
                let weapons = await weaponService.getWeaponsFromRise(req.query)
                res.json(weapons).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/max',
        async (req: Request, res: Response<any>) => {
            try {
                let max = await weaponService.getMaxValues()
                res.json(max).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/:id',
        async (req: RequestWithParams<URIParamsModel>, res: Response<newWeapon | null>) => {
            try {
                const weapon = await weaponService.getWeaponByIdFromRise(req.params.id)
                res.json(weapon).status(200)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    router.post('/',
        async (req: RequestWithBody<newWeapon>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                const newWeapon = await weaponService.addWeaponToRise(req.body)
                if (newWeapon) { res.status(StatusCodes.CREATED).json(newWeapon) }
                else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: 'weapon already exists' })
                }
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    router.post('/max',
        async (req: RequestWithBody<updateWeapon>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                const max = await weaponService.addMaxValues(req.body)
                if (max) { res.status(StatusCodes.CREATED).json(max) }
                else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: 'weapon already exists' })
                }
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    router.put('/',
        async (req: RequestWithBody<updateWeapon>, res: Response<UpdateResult | { message: string }>) => {
            try {
                const updated = await weaponService.updateWeaponToRise(req.body)
                if (updated) { res.status(StatusCodes.CREATED).json(updated) }
                else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: 'error' })
                }
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    router.delete('/:id',
        async (req: RequestWithParams<URIParamsModel>, res: Response<{}>) => {
            try {
                await weaponService.removeWeaponFromRise(req.params.id)
                res.sendStatus(StatusCodes.NO_CONTENT)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    router.delete('/max/:id',
        async (req: RequestWithParams<URIParamsModel>, res: Response<{}>) => {
            try {
                await weaponService.removeMaxValues(req.params.id)
                res.sendStatus(StatusCodes.NO_CONTENT)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    return router
}