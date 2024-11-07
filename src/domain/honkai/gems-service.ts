import { honkaiGemsRepo } from "../../repositories/honkai/gems-repo"

export const honkaiGemsService = {
    async getRows(){
        return honkaiGemsRepo.getRows()
    },
    async addRow(data: any) {
        return honkaiGemsRepo.addRow(data)
    },
}