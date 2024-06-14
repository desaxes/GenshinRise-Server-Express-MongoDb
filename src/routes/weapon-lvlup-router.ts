import express, { Response } from 'express'
import { RequestWithBody } from '../api-types'
import { StatusCodes } from '../StatusCodes'
import { InsertOneResult } from 'mongodb'
import { weaponLvlUpService } from '../domain/weapon-lvlup-service'

export const weaponLvlUpRouter = () => {
    const router = express.Router()
    router.get('/wmat',
        async (req, res) => {
            try {
                let mats = await weaponLvlUpService.getWeaponMaterials()
                res.json(mats).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/wmat/:id',
        async (req, res) => {
            try {
                let mat = await weaponLvlUpService.getWeaponMaterialById(req.params.id)
                res.json(mat).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/ewmat',
        async (req, res) => {
            try {
                let mats = await weaponLvlUpService.getEWMaterials()
                res.json(mats).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/ewmat/:id',
        async (req, res) => {
            try {
                let mat = await weaponLvlUpService.getEWMaterialById(req.params.id)
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
                const newMaterial = await weaponLvlUpService.createWeaponMaterial(req.body.name, req.body.days, files)
                if (newMaterial) { res.status(StatusCodes.CREATED).json(newMaterial) }
                else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: 'error' })
                }
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    router.post('/ewmat',
        async (req: RequestWithBody<{ name: string }>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                let files = req.files
                const newMaterial = await weaponLvlUpService.createEWMaterial(req.body.name, files)
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