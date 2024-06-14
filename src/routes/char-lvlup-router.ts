import express, { Response } from 'express'
import { RequestWithBody, RequestWithParams } from '../api-types'
import { URIParamsModel } from '../models/URIParamsModel'
import { StatusCodes } from '../StatusCodes'
import { InsertOneResult } from 'mongodb'
import { lvlUpService } from '../domain/char-lvlup-service'

export const charLvlUpRouter = () => {
    const router = express.Router()
    router.get('/timers',
        async (req, res) => {
            try {
                let timers = await lvlUpService.getTimers()
                res.json(timers).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/stone',
        async (req, res) => {
            try {
                let stones = await lvlUpService.getStones()
                res.json(stones).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/stone/:id',
        async (req, res) => {
            try {
                let stone = await lvlUpService.getStoneById(req.params.id)
                res.json(stone).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/bmat',
        async (req, res) => {
            try {
                let mat = await lvlUpService.getBossMaterials()
                res.json(mat).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/bmat/:id',
        async (req, res) => {
            try {
                let mat = await lvlUpService.getBossMaterialById(req.params.id)
                res.json(mat).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/emat',
        async (req, res) => {
            try {
                let mat = await lvlUpService.getEnemyMaterials()
                res.json(mat).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/emat/:id',
        async (req, res) => {
            try {
                let mat = await lvlUpService.getEnemyMaterialById(req.params.id)
                res.json(mat).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/ls',
        async (req, res) => {
            try {
                let ls = await lvlUpService.getLocalSpecialtys()
                res.json(ls).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/ls/:id',
        async (req, res) => {
            try {
                let ls = await lvlUpService.getLocalSpecialtyById(req.params.id)
                res.json(ls).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.post('/timers',
        async (req: RequestWithBody<{ id: string }>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                const newTimer = await lvlUpService.createTimer(req.body.id)
                if (newTimer) { res.status(StatusCodes.CREATED).json(newTimer) }
                else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: 'error' })
                }
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    router.post('/emat',
        async (req: RequestWithBody<{ name: string }>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                let files = req.files
                const newMaterial = await lvlUpService.createEnemyMaterial(req.body.name, files)
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
                const newMaterial = await lvlUpService.createBossMaterial(req.body.name, files)
                if (newMaterial) { res.status(StatusCodes.CREATED).json(newMaterial) }
                else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: 'error' })
                }
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    router.post('/ls',
        async (req: RequestWithBody<{ name: string, regionId: string }>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                let files = req.files
                const newMaterial = await lvlUpService.createLocalSpecialty(req.body.name, req.body.regionId, files)
                if (newMaterial) { res.status(StatusCodes.CREATED).json(newMaterial) }
                else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: 'error' })
                }
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    router.post('/stone',
        async (req: RequestWithBody<{ name: string }>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                let files = req.files
                const newMaterial = await lvlUpService.createStone(req.body.name, files)
                if (newMaterial) { res.status(StatusCodes.CREATED).json(newMaterial) }
                else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: 'error' })
                }
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    router.delete('/timers/:id',
        async (req: RequestWithParams<URIParamsModel>, res: Response<{}>) => {
            try {
                await lvlUpService.removeTimer(req.params.id)
                res.sendStatus(StatusCodes.NO_CONTENT)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    return router
}