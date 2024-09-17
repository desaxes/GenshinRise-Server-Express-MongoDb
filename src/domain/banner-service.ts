import { setQueryConditions } from '../functions'
import { rollType } from '../types'
import { RollQueryModel } from '../models/RollQueryModel'
import { RollRepository } from '../repositories/roll-repository'
import { BannerRepository } from '../repositories/banner-repository.js'
import { FileArray } from 'express-fileupload'

export const bannerService = {
    async getAllBanners(query: any) {
        let lim = query.limit || 10
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        return await BannerRepository.getAllBanners(+lim, offset)
    },
    async getBanner(id: number) {
        return await BannerRepository.getBanner(id)
    },
    async createBanner(data: any, files: FileArray | null | undefined) {
        return BannerRepository.addBanner(data, files)
    },
}