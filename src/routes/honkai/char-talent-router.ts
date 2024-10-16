import express, { Response } from 'express'
import { RequestWithBody } from '../../api-types'
import { StatusCodes } from '../../StatusCodes'
import { InsertOneResult } from 'mongodb'
import { zzzTalentService } from '../../domain/zzz/char-talent-service'
import { honkaiTalentService } from '../../domain/honkai/char-talent-service'

export const honkaiCharTalentRouter = () => {
    const router = express.Router()
    router.get('/book',
        async (req, res) => {
            try {
                let stones = await honkaiTalentService.getTalents()
                res.json(stones).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/book/:id',
        async (req, res) => {
            try {
                let mat = await honkaiTalentService.getTalentById(req.params.id)
                res.json(mat).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/wbmat',
        async (req, res) => {
            try {
                let mat = await honkaiTalentService.getWBMaterials()
                res.json(mat).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/wbmat/:id',
        async (req, res) => {
            try {
                let mat = await honkaiTalentService.getWBMaterialById(req.params.id)
                res.json(mat).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.post('/book',
        async (req: RequestWithBody<{ name: string, days: string, pathId: string }>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                let files = req.files
                const newTalent = await honkaiTalentService.createTalent(req.body.name, +req.body.days, +req.body.pathId, files)
                if (newTalent) { res.status(StatusCodes.CREATED).json(newTalent) }
                else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: 'error' })
                }
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    router.post('/wbmat',
        async (req: RequestWithBody<{ name: string }>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                let files = req.files
                const newMaterial = await honkaiTalentService.createWBMaterial(req.body.name, files)
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