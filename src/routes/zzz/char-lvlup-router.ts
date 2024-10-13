import express, { Response } from 'express'
import { RequestWithBody, RequestWithParams } from '../../api-types'
import { URIParamsModel } from '../../models/URIParamsModel'
import { StatusCodes } from '../../StatusCodes'
import { InsertOneResult } from 'mongodb'
import { zzzLvlUpService } from '../../domain/zzz/char-lvlup-service'

export const zzzCharLvlUpRouter = () => {
    const router = express.Router()
    router.get('/bmat',
        async (req, res) => {
            try {
                let mat = await zzzLvlUpService.getBossMaterials()
                res.json(mat).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/bmat/:id',
        async (req, res) => {
            try {
                let mat = await zzzLvlUpService.getBossMaterialById(req.params.id)
                res.json(mat).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/emat',
        async (req, res) => {
            try {
                let mat = await zzzLvlUpService.getEnemyMaterials()
                res.json(mat).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/emat/:id',
        async (req, res) => {
            try {
                let mat = await zzzLvlUpService.getEnemyMaterialById(req.params.id)
                res.json(mat).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.post('/emat',
        async (req: RequestWithBody<{ name: string }>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                let files = req.files
                const newMaterial = await zzzLvlUpService.createEnemyMaterial(req.body.name, files)
                if (newMaterial) { res.status(StatusCodes.CREATED).json(newMaterial) }
                else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: 'error' })
                }
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    router.post('/bmat',
        async (req: RequestWithBody<{ name: string }>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                let files = req.files
                const newMaterial = await zzzLvlUpService.createBossMaterial(req.body.name, files)
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