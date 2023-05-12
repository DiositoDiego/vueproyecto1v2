import { UseCase } from "@/kernel/contact";
import { SaveUserDto } from "../adapters/dto/save-user";
import { ResponseApi } from "@/kernel/types";
import { User } from "../entities/user";
import { UserRepository } from "./ports/user.repository";

export class SaveUserInteractor implements UseCase<SaveUserDto, ResponseApi<User>>{
    constructor(private readonly repository: UserRepository) {}

    execute(input: SaveUserDto): Promise<ResponseApi<User>> {
        return this.repository.save(input)
    }
}