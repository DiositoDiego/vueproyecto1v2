import { UseCase } from "@/kernel/contact";
import { SaveComputerDto } from "../adapters/dto/save-computer";
import { ResponseApi } from "@/kernel/types";
import { Computer } from "../entities/computer";
import { ComputerRepository } from "./ports/computer.repository";

export class SaveComputerInteractor implements UseCase<SaveComputerDto, ResponseApi<Computer>>{
    constructor(private readonly repository: ComputerRepository) {}

    execute(input: SaveComputerDto): Promise<ResponseApi<Computer>> {
        return this.repository.save(input);
    }
}