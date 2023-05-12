import { UseCase } from "@/kernel/contact";
import { ResponseApi } from "@/kernel/types";
import { Computer } from "../entities/computer";
import { ComputerRepository } from "./ports/computer.repository";
import { GetComputerDto } from "../adapters/dto/get-computer";

export class GetComputersInteractor implements UseCase<GetComputerDto, ResponseApi<Computer>>{
    constructor(private readonly repository: ComputerRepository) {}

    execute(): Promise<ResponseApi<Computer>> {
        return this.repository.findAll();
    }
}