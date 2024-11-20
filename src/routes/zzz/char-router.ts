import express, { Request, Response } from 'express'
import { RequestWithBody, RequestWithParams, RequestWithQuery } from '../../api-types'
import { CharQueryModel } from '../../models/CharQueryModel'
import { StatusCodes } from '../../StatusCodes'
import { InsertOneResult } from 'mongodb'
import { char, newChar } from '../../types'
import { URIParamsModel } from '../../models/URIParamsModel'
import { zzzCharacterService } from '../../domain/zzz/char-service'

export const zzzCharRouter = () => {
    const router = express.Router()
    router.get('/',
        async (req: RequestWithQuery<CharQueryModel>, res: Response<any>) => {
            try {
                let chars = await zzzCharacterService.getChars(req.query)
                res.json(chars).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/:id',
        async (req: RequestWithParams<URIParamsModel>, res: Response<newChar | null>) => {
            try {
                const char = await zzzCharacterService.getCharById(req.params.id)
                res.json(char).status(200)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    router.get('/weapon/:id',
        async (req, res) => {
            try {
                const chars = await zzzCharacterService.getCharForWeapon(+req.params.id)
                res.json(chars).status(200)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    router.post('/',
        async (req: RequestWithBody<char>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                let files = req.files
                const newChar = await zzzCharacterService.createChar(req.body, files)
                if (newChar) { res.status(StatusCodes.CREATED).json(newChar) }
                else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: 'error' })
                }
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    router.put('/update',
        async (req, res) => {
            try {
                const updateChar = await zzzCharacterService.updateCharInfo(req.body)
                if (updateChar) { res.status(StatusCodes.CREATED).json(updateChar) }
                else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: 'error' })
                }
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    return router
}