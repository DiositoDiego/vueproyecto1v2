import { ResponseApi } from "@/kernel/types"
import { Computer } from "../../entities/computer"
import { UpdateComputerDto } from "../../adapters/dto/update-computer"
import { SaveComputerDto } from "../../adapters/dto/save-computer"
import { DeleteComputerDto } from "../../adapters/dto/delete-computer"

export interface ComputerRepository {
    findAll(): Promise<ResponseApi<Computer>>
    findById(id: string): Promise<ResponseApi<Computer>>
    save(computer:  SaveComputerDto): Promise<ResponseApi<Computer>>
    update(computer: UpdateComputerDto): Promise<ResponseApi<Computer>>
    delete(id: DeleteComputerDto): Promise<ResponseApi<Computer>>
}