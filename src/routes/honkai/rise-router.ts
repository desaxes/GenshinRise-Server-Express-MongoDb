import express, { Request, Response } from 'express'
import { RequestWithBody, RequestWithParams, RequestWithQuery } from '../../api-types'
import { CharQueryModel } from '../../models/CharQueryModel'
import { StatusCodes } from '../../StatusCodes'
import { characterService } from '../../domain/genshin/char-service'
import { InsertOneResult, UpdateResult } from 'mongodb'
import { newChar, updateChar } from '../../types'
import { URIParamsModel } from '../../models/URIParamsModel'
import { zzzCharacterService } from '../../domain/zzz/char-service'
import { honkaiCharacterService } from '../../domain/honkai/char-service'

export const honkaiRiseRouter = () => {
    const router = express.Router()
    router.get('/',
        async (req: RequestWithQuery<CharQueryModel>, res: Response<any>) => {
            try {
                let chars = await honkaiCharacterService.getCharsFromRise(req.query)
                res.json(chars).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/:id',
        async (req: RequestWithParams<URIParamsModel>, res: Response<newChar | null>) => {
            try {
                const char = await honkaiCharacterService.getCharByIdFromRise(req.params.id)
                res.json(char).status(200)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    router.post('/',
        async (req: RequestWithBody<newChar>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                const newChar = await honkaiCharacterService.addCharToRise(req.body)
                if (newChar) { res.status(StatusCodes.CREATED).json(newChar) }
                else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: 'character already exists' })
                }
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    router.put('/',
        async (req: RequestWithBody<updateChar>, res: Response<UpdateResult | { message: string }>) => {
            try {
                const updated = await honkaiCharacterService.updateCharToRise(req.body)
                if (updated) { res.status(StatusCodes.CREATED).json(updated) }
                else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: 'error' })
                }
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    router.delete('/:id',
        async (req: RequestWithParams<URIParamsModel>, res: Response<{}>) => {
            try {
                await honkaiCharacterService.removeCharFromRise(req.params.id)
                res.sendStatus(StatusCodes.NO_CONTENT)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    return router
}