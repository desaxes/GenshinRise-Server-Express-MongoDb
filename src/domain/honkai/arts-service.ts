import { honkaiArtsRepo } from "../../repositories/honkai/arts-repos"

export const honkaiArtsService = {
    async getArts() {
        return honkaiArtsRepo.getArts()
    },
    async getArtById(id: number) {
        return honkaiArtsRepo.getArtById(id)
    },
    async createArt(data: any, files: any) {
        return honkaiArtsRepo.createArt(data, files)
    }
}