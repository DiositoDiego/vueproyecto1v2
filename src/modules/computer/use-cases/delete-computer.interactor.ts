import { ResponseApi } from "@/kernel/types";
import { DeleteComputerDto } from "../adapters/dto/delete-computer";
import { ComputerRepository } from "./ports/computer.repository";
import { Computer } from "../entities/computer";
import { UseCase } from "@/kernel/contact";

export class DeleteComputerInteractor implements UseCase<DeleteComputerDto, ResponseApi<Computer>>{
    constructor(private computerRepository: ComputerRepository){}

    execute(input: DeleteComputerDto): Promise<ResponseApi<Computer>> {
        return this.computerRepository.delete(input);
    }
}