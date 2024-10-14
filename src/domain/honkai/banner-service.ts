import { FileArray } from 'express-fileupload'
import { honkaiBannerRepository } from '../../repositories/honkai/banner-repository.js'

export const honkaiBannerService = {
    async getAllBanners(query: any) {
        let lim = query.limit || 10
        let offset = (query.page ? +query.page : 1) * +lim - +lim
        return await honkaiBannerRepository.getAllBanners(+lim, offset)
    },
    async getBanner(id: number) {
        return await honkaiBannerRepository.getBanner(id)
    },
    async createBanner(data: any, files: FileArray | null | undefined) {
        return honkaiBannerRepository.addBanner(data, files)
    },
}