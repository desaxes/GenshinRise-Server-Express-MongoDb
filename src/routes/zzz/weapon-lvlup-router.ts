import express, { Response } from 'express'
import { RequestWithBody } from '../../api-types'
import { StatusCodes } from '../../StatusCodes'
import { InsertOneResult } from 'mongodb'
import { zzzWeaponLvlUpService } from '../../domain/zzz/weapon-lvlup-service'

export const zzzWeaponLvlUpRouter = () => {
    const router = express.Router()
    router.get('/wmat',
        async (req, res) => {
            try {
                let mats = await zzzWeaponLvlUpService.getWeaponMaterials()
                res.json(mats).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/wmat/:id',
        async (req, res) => {
            try {
                let mat = await zzzWeaponLvlUpService.getWeaponMaterialById(req.params.id)
                res.json(mat).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.post('/wmat',
        async (req: RequestWithBody<{ name: string, days: string }>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                let files = req.files
                const newMaterial = await zzzWeaponLvlUpService.createWeaponMaterial(req.body.name, req.body.days, files)
                if (newMaterial) { res.status(StatusCodes.CREATED).json(newMaterial) }
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