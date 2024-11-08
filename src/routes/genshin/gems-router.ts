import express, { Request, Response } from 'express'
import { gemsService } from '../../domain/genshin/gems-service'
export const gemsRouter = () => {
    const router = express.Router()
    router.post('/', async (req, res) => {
        try {
            let row = await gemsService.addRow(req.body)
            res.json(row).status(201)
        }
        catch (e) {
            res.sendStatus(500)
        }
    })
    router.get('/', async (req, res) => {
        try {
            let rows = await gemsService.getRows()
            res.json(rows).status(200)
        }
        catch (e) {
            res.sendStatus(500)
        }
    })
    router.get('/all', async (req, res) => {
        try {
            let rows = await gemsService.getAllRows()
            res.json(rows).status(200)
        }
        catch (e) {
            res.sendStatus(500)
        }
    })
    return router
}