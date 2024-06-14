import express, { Request, Response } from 'express'
import { RequestWithBody, RequestWithParams, RequestWithQuery } from '../api-types'
import { CharQueryModel } from '../models/CharQueryModel'
import { StatusCodes } from '../StatusCodes'
import { characterService } from '../domain/char-service'
import { InsertOneResult, UpdateResult } from 'mongodb'
import {  newChar, updateChar } from '../types'
import { URIParamsModel } from '../models/URIParamsModel'

export const riseRouter = () => {
    const router = express.Router()
    router.get('/',
        async (req: RequestWithQuery<CharQueryModel>, res: Response<any>) => {
            try {
                let chars = await characterService.getCharsFromRise(req.query)
                res.json(chars).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/max',
        async (req: Request, res: Response<any>) => {
            try {
                let max = await characterService.getMaxValues()
                res.json(max).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/:id',
        async (req: RequestWithParams<URIParamsModel>, res: Response<newChar | null>) => {
            try {
                const char = await characterService.getCharByIdFromRise(req.params.id)
                res.json(char).status(200)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    router.post('/',
        async (req: RequestWithBody<newChar>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                const newChar = await characterService.addCharToRise(req.body)
                if (newChar) { res.status(StatusCodes.CREATED).json(newChar) }
                else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: 'character already exists' })
                }
            }
            catch (e) {
                res.status(StatusCodes.BAD_REQUEST)
            }
        })
    router.post('/max',
        async (req: RequestWithBody<updateChar>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                const max = await characterService.addMaxValues(req.body)
                if (max) { res.status(StatusCodes.CREATED).json(max) }
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
                const updated = await characterService.updateCharToRise(req.body)
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
                await characterService.removeCharFromRise(req.params.id)
                res.sendStatus(StatusCodes.NO_CONTENT)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    router.delete('/max/:id',
        async (req: RequestWithParams<URIParamsModel>, res: Response<{}>) => {
            try {
                await characterService.removeMaxValues(req.params.id)
                res.sendStatus(StatusCodes.NO_CONTENT)
            }
            catch (e) {
                res.sendStatus(StatusCodes.NOT_FOUND)
            }
        })
    return router
}