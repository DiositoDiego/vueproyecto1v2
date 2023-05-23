import { UseCase } from "@/kernel/contact";
import { GetComputerDto } from "../adapters/dto/get-computer";
import { ResponseApi } from "@/kernel/types";
import { Computer } from "../entities/computer";
import { ComputerRepository } from "./ports/computer.repository";

export class GetComputerInteractor implements UseCase<GetComputerDto, ResponseApi<Computer>>{
    constructor(private readonly repository: ComputerRepository) {}

    execute(input: GetComputerDto): Promise<ResponseApi<Computer>> {
        return this.repository.findById(input._id);
    }
}