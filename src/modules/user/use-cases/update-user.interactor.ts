import { UseCase } from "@/kernel/contact";
import { UpdateUserDto } from "../adapters/dto/update-user";
import { User } from "../entities/user";
import { ResponseApi } from "@/kernel/types";
import { UserRepository } from "./ports/user.repository";

export class UpdateUserInteractor implements UseCase<UpdateUserDto, ResponseApi<User>>{
    constructor(private readonly repository: UserRepository) {}
    
    execute(input: UpdateUserDto): Promise<ResponseApi<User>> {
        return this.repository.update(input)
    }
}