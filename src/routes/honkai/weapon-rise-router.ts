import express, { Request, Response } from 'express'
import { RequestWithBody, RequestWithParams, RequestWithQuery } from '../../api-types'
import { StatusCodes } from '../../StatusCodes'
import { InsertOneResult, UpdateResult } from 'mongodb'
import { newWeapon, updateWeapon } from '../../types'
import { URIParamsModel } from '../../models/URIParamsModel'
import { WeaponQueryModel } from '../../models/WeaponQueryModel'
import { weaponService } from '../../domain/genshin/weapon-service'
import { zzzWeaponService } from '../../domain/zzz/weapon-service'
import { honkaiWeaponService } from '../../domain/honkai/weapon-service'

export const honkaiWeaponRiseRouter = () => {
    const router = express.Router()
    router.get('/',
        async (req: RequestWithQuery<WeaponQueryModel>, res: Response<any>) => {
            try {
                let weapons = await honkaiWeaponService.getWeaponsFromRise(req.query)
                res.json(weapons).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/:id',
        async (req: RequestWithParams<URIParamsModel>, res: Response<newWeapon | null>) => {
            try {
                const weapon = await honkaiWeaponService.getWeaponByIdFromRise(req.params.id)
                res.json(weapon).status(200)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    router.post('/',
        async (req: RequestWithBody<newWeapon>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                const newWeapon = await honkaiWeaponService.addWeaponToRise(req.body)
                if (newWeapon) { res.status(StatusCodes.CREATED).json(newWeapon) }
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
                const updated = await honkaiWeaponService.updateWeaponToRise(req.body)
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
                await honkaiWeaponService.removeWeaponFromRise(req.params.id)
                res.sendStatus(StatusCodes.NO_CONTENT)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    return router
}