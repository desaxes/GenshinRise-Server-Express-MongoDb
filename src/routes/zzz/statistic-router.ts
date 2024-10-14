import express, { Request, Response } from 'express'
import { RequestWithBody, RequestWithParams, RequestWithQuery } from '../../api-types'
import { CharQueryModel } from '../../models/CharQueryModel'
import { StatusCodes } from '../../StatusCodes'
import { characterService } from '../../domain/genshin/char-service'
import { InsertOneResult } from 'mongodb'
import { char, newChar } from '../../types'
import { URIParamsModel } from '../../models/URIParamsModel'
import { zzzCharacterService } from '../../domain/zzz/char-service'

export const zzzStatisticRouter = () => {
    const router = express.Router()
    router.get('/chars',
        async (req: Request, res: Response<any>) => {
            try {
                let stat = await zzzCharacterService.getCharStat()
                res.json(stat).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    return router
}