import { zzzArtsRepo } from "../../repositories/zzz/arts-repos"

export const zzzArtsService = {
    async getArts() {
        return zzzArtsRepo.getArts()
    },
    async getArtById(id: number) {
        return zzzArtsRepo.getArtById(id)
    },
    async createArt(data: any, files: any) {
        return zzzArtsRepo.createArt(data, files)
    }
}