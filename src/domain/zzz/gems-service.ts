import { zzzGemsRepo } from "../../repositories/zzz/gems-repo"

export const zzzGemsService = {
    async getRows(){
        return zzzGemsRepo.getRows()
    },
    async getAllRows(){
        return zzzGemsRepo.getAllRows()
    },
    async addRow(data: any) {
        return zzzGemsRepo.addRow(data)
    },
}