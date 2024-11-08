import express, { Request, Response } from 'express'
import { honkaiGemsService } from '../../domain/honkai/gems-service'
export const honkaiGemsRouter = () => {
    const router = express.Router()
    router.post('/', async (req, res) => {
        try {
            let row = await honkaiGemsService.addRow(req.body)
            res.json(row).status(201)
        }
        catch (e) {
            res.sendStatus(500)
        }
    })
    router.get('/', async (req, res) => {
        try {
            let rows = await honkaiGemsService.getRows()
            res.json(rows).status(200)
        }
        catch (e) {
            res.sendStatus(500)
        }
    })
    router.get('/all', async (req, res) => {
        try {
            let rows = await honkaiGemsService.getAllRows()
            res.json(rows).status(200)
        }
        catch (e) {
            res.sendStatus(500)
        }
    })
    return router
}