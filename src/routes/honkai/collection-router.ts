import express, { Response } from 'express'
import { RequestWithBody, RequestWithParams, RequestWithQuery } from '../../api-types'
import { StatusCodes } from '../../StatusCodes'
import { characterService } from '../../domain/genshin/char-service'
import { InsertOneResult } from 'mongodb'
import { newChar } from '../../types'
import { URIParamsModel } from '../../models/URIParamsModel'
import { WeaponQueryModel } from '../../models/WeaponQueryModel'
import { zzzCharacterService } from '../../domain/zzz/char-service'
import { honkaiCharacterService } from '../../domain/honkai/char-service'

export const honkaiCollectionRouter = () => {
    const router = express.Router()
    router.get('/',
        async (req: RequestWithQuery<WeaponQueryModel>, res: Response<any>) => {
            try {
                let chars = await honkaiCharacterService.getCharsFromCol(req.query)
                res.json(chars).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/:id',
        async (req: RequestWithParams<URIParamsModel>, res: Response<newChar | null>) => {
            try {
                const char = await honkaiCharacterService.getCharByIdFromCol(req.params.id)
                res.json(char).status(200)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    router.post('/',
        async (req: RequestWithBody<newChar>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                const newChar = await honkaiCharacterService.addCharToCol(req.body)
                if (newChar) { res.status(StatusCodes.CREATED).json(newChar) }
                else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: 'character already exists' })
                }
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    router.delete('/:id',
        async (req: RequestWithParams<URIParamsModel>, res: Response<{}>) => {
            try {
                await honkaiCharacterService.removeCharFromCol(req.params.id)
                res.sendStatus(StatusCodes.NO_CONTENT)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    return router
}