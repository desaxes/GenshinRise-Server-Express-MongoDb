import express, { Request, Response } from 'express'
import { zzzGemsService } from '../../domain/zzz/gems-service'
export const zzzGemsRouter = () => {
    const router = express.Router()
    router.post('/', async (req, res) => {
        try {
            let row = await zzzGemsService.addRow(req.body)
            res.json(row).status(201)
        }
        catch (e) {
            res.sendStatus(500)
        }
    })
    router.get('/', async (req, res) => {
        try {
            let rows = await zzzGemsService.getRows()
            res.json(rows).status(200)
        }
        catch (e) {
            res.sendStatus(500)
        }
    })
    return router
}