import { UseCase } from "@/kernel/contact";
import { User } from "../entities/user";
import { GetUserDto } from "../adapters/dto/get-user";
import { ResponseApi } from "@/kernel/types";
import { UserRepository } from "./ports/user.repository";

export class GetUserInteractor implements UseCase<GetUserDto, ResponseApi<User>> {
    constructor(private readonly repository: UserRepository) {}

    execute(input: GetUserDto): Promise<ResponseApi<User>> {
        return this.repository.findById(input.id);
    }
}