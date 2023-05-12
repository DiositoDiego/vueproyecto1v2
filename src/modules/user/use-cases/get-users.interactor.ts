import { UseCase } from "@/kernel/contact";
import { User } from "../entities/user";
import { GetUserDto } from "../adapters/dto/get-user";
import { ResponseApi } from "@/kernel/types";
import { UserRepository } from "./ports/user.repository";

export class GetUsersInteractor implements UseCase<GetUserDto, ResponseApi<User>> {
    constructor(private readonly repository: UserRepository) {}

    execute(): Promise<ResponseApi<User>> {
        return this.repository.findAll()
    }
}