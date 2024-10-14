import express, { Request, Response } from 'express'
import { zzzCharacterService } from '../../domain/zzz/char-service'
import { honkaiCharacterService } from '../../domain/honkai/char-service'

export const honkaiStatisticRouter = () => {
    const router = express.Router()
    router.get('/chars',
        async (req: Request, res: Response<any>) => {
            try {
                let stat = await honkaiCharacterService.getCharStat()
                res.json(stat).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    return router
}