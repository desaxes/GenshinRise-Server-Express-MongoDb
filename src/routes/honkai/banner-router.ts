import express, { Request, Response } from 'express'
import { RequestWithBody, RequestWithQuery } from '../../api-types'
import { StatusCodes } from '../../StatusCodes'
import { InsertOneResult } from 'mongodb'
import { rollType } from '../../types'
import { RollQueryModel } from '../../models/RollQueryModel'
import { bannerService } from '../../domain/genshin/banner-service'
import { zzzBannerService } from '../../domain/zzz/banner-service'
import { honkaiBannerService } from '../../domain/honkai/banner-service'

export const honkaiBannerRouter = () => {
    const router = express.Router()
    router.get('/',
        async (req: RequestWithQuery<RollQueryModel>, res: Response<any>) => {
            try {
                let banners = await honkaiBannerService.getAllBanners(req.query)
                res.json(banners).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.get('/:id',
        async (req: Request, res: Response<any>) => {
            try {
                let banners = await honkaiBannerService.getBanner(+req.params.id)
                res.json(banners).status(200)
            }
            catch (e) {
                res.sendStatus(500)
            }
        })
    router.post('/',
        async (req: RequestWithBody<any>, res: Response<InsertOneResult | { message: string }>) => {
            try {
                let files = req.files
                const newBanner = await honkaiBannerService.createBanner(req.body, files)
                if (newBanner) { res.status(StatusCodes.CREATED).json(newBanner) }
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