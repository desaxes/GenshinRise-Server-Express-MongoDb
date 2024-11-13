import { artsRepo } from "../../repositories/genshin/arts-repos"

export const artsService = {
    async getArts() {
        return artsRepo.getArts()
    },
    async getArtById(id: number) {
        return artsRepo.getArtById(id)
    },
    async createArt(data: any, files: any) {
        return artsRepo.createArt(data, files)
    }
}