import { ResponseApi } from "@/kernel/types";
import { GetComputersInteractor } from "../use-cases/get-computers.interactor";
import { ComputerRepository } from "../use-cases/ports/computer.repository";
import { ComputerStorageGateway } from "./computer.storage.gateway";
import { Computer } from "../entities/computer";
import { GetComputerInteractor } from "../use-cases/get-computer.interactor";
import { GetComputerDto } from "./dto/get-computer";
import { SaveComputerInteractor } from "../use-cases/save-computer.interactor";
import { SaveComputerDto } from "./dto/save-computer";
import { UpdateComputerInteractor } from "../use-cases/update-computer.interactor";
import { UpdateComputerDto } from "./dto/update-computer";
import { DeleteComputerDto } from "./dto/delete-computer";
import { DeleteComputerInteractor } from "../use-cases/delete-computer.interactor";

export class ComputerController {
    findAllComputers(){
        const repository: ComputerRepository = new ComputerStorageGateway();
        const interactor: GetComputersInteractor = new GetComputersInteractor(repository);

        try {
            return interactor.execute();
        } catch (error) {
            return {
                code: 500,
                message: "INTERNAL SERVER ERROR",
                error: true,
            } as ResponseApi<Computer>;
        }
    }

    findComputerById(_id: string){
        const repository: ComputerRepository = new ComputerStorageGateway();
        const interactor: GetComputerInteractor = new GetComputerInteractor(repository);

        try {
            return interactor.execute({_id} as GetComputerDto);
        } catch (error) {
            return {
                code: 500,
                message: "INTERNAL SERVER ERROR",
                error: true,
            } as ResponseApi<Computer>;
        }
    }

    saveComputer(computer: SaveComputerDto){
        const repository: ComputerRepository = new ComputerStorageGateway();
        const interactor: SaveComputerInteractor = new SaveComputerInteractor(repository);

        try {
            return interactor.execute(computer);
        } catch (error) {
            return {
                code: 500,
                message: "INTERNAL SERVER ERROR",
                error: true,
            } as ResponseApi<Computer>;
        }
    }

    updateComputer(computer: UpdateComputerDto){
        const repository: ComputerRepository = new ComputerStorageGateway();
        const interactor: UpdateComputerInteractor = new UpdateComputerInteractor(repository);

        try {
            return interactor.execute(computer);
        } catch (error) {
            return {
                code: 500,
                message: "INTERNAL SERVER ERROR",
                error: true,
            } as ResponseApi<Computer>;
        }
    }

    deleteComputer(computer: DeleteComputerDto){
        const repository: ComputerRepository = new ComputerStorageGateway();
        const interactor: DeleteComputerInteractor = new DeleteComputerInteractor(repository);

        try {
            return interactor.execute(computer);
        } catch (error) {
            return {
                code: 500,
                message: "INTERNAL SERVER ERROR",
                error: true,
            } as ResponseApi<Computer>;
        }
    }
}