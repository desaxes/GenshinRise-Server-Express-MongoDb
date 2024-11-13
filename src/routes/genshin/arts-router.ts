import express from 'express'
import { artsService } from '../../domain/genshin/arts-service'
export const artsRouter = () => {
    const router = express.Router()
    router.post('/', async (req, res) => {
        try {
            let art = await artsService.createArt(req.body, req.files)
            res.json(art).status(201)
        }
        catch (e) {
            res.sendStatus(500)
        }
    })
    router.get('/', async (req, res) => {
        try {
            let arts = await artsService.getArts()
            res.json(arts).status(200)
        }
        catch (e) {
            res.sendStatus(500)
        }
    })
    router.get('/:id', async (req, res) => {
        try {
            let art = await artsService.getArtById(+req.params.id)
            res.json(art).status(200)
        }
        catch (e) {
            res.sendStatus(500)
        }
    })
    return router
}