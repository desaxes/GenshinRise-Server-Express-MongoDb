import express, { Response } from 'express'
import { RequestWithBody, RequestWithParams, RequestWithQuery } from '../../api-types'
import { StatusCodes } from '../../StatusCodes'
import { InsertOneResult } from 'mongodb'
import { newWeapon, weaponType } from '../../types'
import { URIParamsModel } from '../../models/URIParamsModel'
import { WeaponQueryModel } from '../../models/WeaponQueryModel'
import { weaponService } from '../../domain/genshin/weapon-service'

export const weaponRouter = () => {
    const router = express.Router()
    router.get('/',
        async (req: RequestWithQuery<WeaponQueryModel>, res: Response<{ weapons: newWeapon[], total: number }>) => {
            try {
                let weapons = await weaponService.getWeapons(req.query)
                res.json(weapons).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/:id',
        async (req: RequestWithParams<URIParamsModel>, res: Response<newWeapon | null>) => {
            try {
                const weapon = await weaponService.getWeaponById(req.params.id)
                res.json(weapon).status(200)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    router.post('/',
        async (req: RequestWithBody<weaponType>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                let files = req.files
                const newWeapon = await weaponService.createWeapon(req.body, files)
                if (newWeapon) { res.status(StatusCodes.CREATED).json(newWeapon) }
                else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: 'error' })
                }
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    router.put('/update',
        async (req, res) => {
            try {
                const updateWeapon = await weaponService.updateWeaponInfo(req.body)
                if (updateWeapon) { res.status(StatusCodes.CREATED).json(updateWeapon) }
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