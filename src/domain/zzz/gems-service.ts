import { zzzGemsRepo } from "../../repositories/zzz/gems-repo"

export const zzzGemsService = {
    async getRows(){
        return zzzGemsRepo.getRows()
    },
    async addRow(data: any) {
        return zzzGemsRepo.addRow(data)
    },
}