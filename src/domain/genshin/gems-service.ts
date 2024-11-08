import { gemsRepo } from "../../repositories/genshin/gems-repo"

export const gemsService = {
    async getRows(){
        return gemsRepo.getRows()
    },
    async getAllRows(){
        return gemsRepo.getAllRows()
    },
    async addRow(data: any) {
        return gemsRepo.addRow(data)
    },
}