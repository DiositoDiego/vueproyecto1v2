import { ResponseApi } from "@/kernel/types";
import { GetUserInteractor } from "../use-cases/get-user.interactor";
import { UserRepository } from "../use-cases/ports/user.repository";
import { UserStorageGateway } from "./user.storage.gateway";
import { User } from "../entities/user";
import { GetUsersInteractor } from "../use-cases/get-users.interactor";
import { GetUserDto } from "./dto/get-user";
import { SaveUserInteractor } from "../use-cases/save-user.interactor";
import { UpdateUserInteractor } from "../use-cases/update-user.interactor";
import { UpdateUserDto } from "./dto/update-user";
import { SaveUserDto } from "./dto/save-user";

export class UserController {
    findAllUsers() {
        const repository: UserRepository = new UserStorageGateway();
        const interactor: GetUsersInteractor = new GetUsersInteractor(repository);

        try {
            return interactor.execute();
        } catch (err) {
            return {
                code: 500,
                message: "INTERNAL SERVER ERROR",
                error: true,
            } as ResponseApi<User>;
        }
    }

    findUserById(id: string){
        const repository: UserRepository = new UserStorageGateway();
        const interactor: GetUserInteractor = new GetUserInteractor(repository);

        try {
            return interactor.execute({id} as GetUserDto);
        } catch (error) {
            return {
                code: 500,
                message: "INTERNAL SERVER ERROR",
                error: true,
            } as ResponseApi<User>;
        }
    }

    saveUser(user: SaveUserDto){
        const repository: UserRepository = new UserStorageGateway();
        const interactor: SaveUserInteractor = new SaveUserInteractor(repository);

        try {
            return interactor.execute(user);
        } catch (error) {
            return {
                code: 500,
                message: "INTERNAL SERVER ERROR",
                error: true,
            } as ResponseApi<User>;
        }
    }

    updateUser(user: UpdateUserDto){
        const repository: UserRepository = new UserStorageGateway();
        const interactor: UpdateUserInteractor = new UpdateUserInteractor(repository);

        try {
            return interactor.execute(user);
        } catch (error) {
            return {
                code: 500,
                message: "INTERNAL SERVER ERROR",
                error: true,
            } as ResponseApi<User>;
        }
    }
}