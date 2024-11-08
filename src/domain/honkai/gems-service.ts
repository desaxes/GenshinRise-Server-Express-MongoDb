import { honkaiGemsRepo } from "../../repositories/honkai/gems-repo"

export const honkaiGemsService = {
    async getRows(){
        return honkaiGemsRepo.getRows()
    },
    async getAllRows(){
        return honkaiGemsRepo.getAllRows()
    },
    async addRow(data: any) {
        return honkaiGemsRepo.addRow(data)
    },
}