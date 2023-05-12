import { ResponseApi } from "@/kernel/types"
import { User } from "../../entities/user"
import { SaveUserDto } from "../../adapters/dto/save-user"
import { UpdateUserDto } from "../../adapters/dto/update-user"

export interface UserRepository {
    findAll(): Promise<ResponseApi<User>>
    findById(id: string): Promise<ResponseApi<User>>
    save(user:  SaveUserDto): Promise<ResponseApi<User>>
    update(user: UpdateUserDto): Promise<ResponseApi<User>>
}