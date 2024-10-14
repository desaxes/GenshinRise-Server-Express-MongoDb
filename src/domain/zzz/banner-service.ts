import { setQueryConditions } from '../../functions'
import { rollType } from '../../types'
import { RollQueryModel } from '../../models/RollQueryModel'
import { RollRepository } from '../../repositories/genshin/roll-repository'
import { BannerRepository } from '../../repositories/genshin/banner-repository.js.js'
import { FileArray } from 'express-fileupload'
import { zzzBannerRepository } from '../../repositories/zzz/banner-repository.js'

export const zzzBannerService = {
    async getAllBanners(query: any) {
        let lim = query.limit || 10
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        return await zzzBannerRepository.getAllBanners(+lim, offset)
    },
    async getBanner(id: number) {
        return await zzzBannerRepository.getBanner(id)
    },
    async createBanner(data: any, files: FileArray | null | undefined) {
        return zzzBannerRepository.addBanner(data, files)
    },
}