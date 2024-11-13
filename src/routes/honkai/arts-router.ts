import express from 'express'
import { honkaiArtsService } from '../../domain/honkai/arts-service'
export const honkaiArtsRouter = () => {
    const router = express.Router()
    router.post('/', async (req, res) => {
        try {
            let art = await honkaiArtsService.createArt(req.body, req.files)
            res.json(art).status(201)
        }
        catch (e) {
            res.sendStatus(500)
        }
    })
    router.get('/', async (req, res) => {
        try {
            let arts = await honkaiArtsService.getArts()
            res.json(arts).status(200)
        }
        catch (e) {
            res.sendStatus(500)
        }
    })
    router.get('/:id', async (req, res) => {
        try {
            let art = await honkaiArtsService.getArtById(+req.params.id)
            res.json(art).status(200)
        }
        catch (e) {
            res.sendStatus(500)
        }
    })
    return router
}