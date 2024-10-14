import express, { Response } from 'express'
import { RequestWithBody, RequestWithParams, RequestWithQuery } from '../../api-types'
import { CharQueryModel } from '../../models/CharQueryModel'
import { StatusCodes } from '../../StatusCodes'
import { InsertOneResult } from 'mongodb'
import { newWeapon } from '../../types'
import { URIParamsModel } from '../../models/URIParamsModel'
import { weaponService } from '../../domain/genshin/weapon-service'
import { zzzWeaponService } from '../../domain/zzz/weapon-service'

export const zzzWeaponCollectionRouter = () => {
    const router = express.Router()
    router.get('/',
        async (req: RequestWithQuery<CharQueryModel>, res: Response<any>) => {
            try {
                let weapons = await zzzWeaponService.getWeaponsFromCol(req.query)
                res.json(weapons).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/:id',
        async (req: RequestWithParams<URIParamsModel>, res: Response<newWeapon | null>) => {
            try {
                const weapon = await zzzWeaponService.getWeaponFromColById(req.params.id)
                res.json(weapon).status(200)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    router.post('/',
        async (req: RequestWithBody<newWeapon>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                const newWeapon = await zzzWeaponService.addWeaponToCol(req.body)
                if (newWeapon) { res.status(StatusCodes.CREATED).json(newWeapon) }
                else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: 'weapon already exists' })
                }
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    router.delete('/:id',
        async (req: RequestWithParams<URIParamsModel>, res: Response<{}>) => {
            try {
                await zzzWeaponService.removeWeaponFromCol(req.params.id)
                res.sendStatus(StatusCodes.NO_CONTENT)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    return router
}