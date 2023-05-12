import { ResponseApi } from "@/kernel/types";
import { UserRepository } from "../use-cases/ports/user.repository";
import { User } from "../entities/user";
import { SaveUserDto } from "./dto/save-user";
import { UpdateUserDto } from "./dto/update-user";

export class UserStorageGateway implements UserRepository{
    async findAll(): Promise<ResponseApi<User>> {
        return await fetch('http://localhost:3001/users').then(response => response.json())
            .then(({data})=>{
                return {
                    code: 200,
                    message: 'OK',
                    error: false,
                    entities: data,
                    count: data.length
                } as ResponseApi<User>
            }).catch(() => this.getError())
    }
    async findById(id: string): Promise<ResponseApi<User>> {
        return await fetch(`http://localhost:3001/users/${id}`).then(response => response.json())
            .then(({data}) => {
                return {
                    code: 200,
                    message: 'OK',
                    error: false,
                    entities: data,
                    count: data.length
                } as ResponseApi<User>
            }).catch(() => this.getError())
    }
    async save(user: SaveUserDto): Promise<ResponseApi<User>> {
        return await fetch('http://localhost:3001/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(({data}) => {
                return {
                    code: 200,
                    message: 'OK',
                    error: false,
                    entities: data,
                    count: data.length
                } as ResponseApi<User>
            }).catch(() => this.getError())
    }
    async update(user: UpdateUserDto): Promise<ResponseApi<User>> {
        return await fetch(`http://localhost:3001/users/${user.id}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(({data}) => {
                return {
                    code: 200,
                    message: 'OK',
                    error: false,
                    entities: data,
                    count: data.length
                } as ResponseApi<User>
            })
            .catch(() => this.getError())
    }
    getError(): ResponseApi<User> {
        return {
            code: 500,
            message: 'Internal Server Error',
            error: true
        } as ResponseApi<User>
    }
    
}
    