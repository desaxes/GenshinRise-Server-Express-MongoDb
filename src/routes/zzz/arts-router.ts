import express from 'express'
import { zzzArtsService } from '../../domain/zzz/arts-service'
export const zzzArtsRouter = () => {
    const router = express.Router()
    router.post('/', async (req, res) => {
        try {
            let art = await zzzArtsService.createArt(req.body, req.files)
            res.json(art).status(201)
        }
        catch (e) {
            res.sendStatus(500)
        }
    })
    router.get('/', async (req, res) => {
        try {
            let arts = await zzzArtsService.getArts()
            res.json(arts).status(200)
        }
        catch (e) {
            res.sendStatus(500)
        }
    })
    router.get('/:id', async (req, res) => {
        try {
            let art = await zzzArtsService.getArtById(+req.params.id)
            res.json(art).status(200)
        }
        catch (e) {
            res.sendStatus(500)
        }
    })
    return router
}