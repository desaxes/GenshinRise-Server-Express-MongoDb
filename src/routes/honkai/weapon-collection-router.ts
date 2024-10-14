import express, { Response } from 'express'
import { RequestWithBody, RequestWithParams, RequestWithQuery } from '../../api-types'
import { CharQueryModel } from '../../models/CharQueryModel'
import { StatusCodes } from '../../StatusCodes'
import { InsertOneResult } from 'mongodb'
import { newWeapon } from '../../types'
import { URIParamsModel } from '../../models/URIParamsModel'
import { honkaiWeaponService } from '../../domain/honkai/weapon-service'

export const honkaiWeaponCollectionRouter = () => {
    const router = express.Router()
    router.get('/',
        async (req: RequestWithQuery<CharQueryModel>, res: Response<any>) => {
            try {
                let weapons = await honkaiWeaponService.getWeaponsFromCol(req.query)
                res.json(weapons).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/:id',
        async (req: RequestWithParams<URIParamsModel>, res: Response<newWeapon | null>) => {
            try {
                const weapon = await honkaiWeaponService.getWeaponFromColById(req.params.id)
                res.json(weapon).status(200)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    router.post('/',
        async (req: RequestWithBody<newWeapon>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                const newWeapon = await honkaiWeaponService.addWeaponToCol(req.body)
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
                await honkaiWeaponService.removeWeaponFromCol(req.params.id)
                res.sendStatus(StatusCodes.NO_CONTENT)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    return router
}