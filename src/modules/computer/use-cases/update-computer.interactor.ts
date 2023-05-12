import { UseCase } from "@/kernel/contact";
import { UpdateComputerDto } from "../adapters/dto/update-computer";
import { ResponseApi } from "@/kernel/types";
import { Computer } from "../entities/computer";
import { ComputerRepository } from "./ports/computer.repository";

export class UpdateComputerInteractor implements UseCase<UpdateComputerDto, ResponseApi<Computer>>{
    constructor(private readonly repository: ComputerRepository) {}

    execute(input: UpdateComputerDto): Promise<ResponseApi<Computer>> {
        return this.repository.update(input);
    }
}