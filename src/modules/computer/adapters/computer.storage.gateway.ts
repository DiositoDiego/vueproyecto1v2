import { ResponseApi } from "@/kernel/types";
import { Computer } from "../entities/computer";
import { ComputerRepository } from "../use-cases/ports/computer.repository";
import { SaveComputerDto } from "./dto/save-computer";
import { UpdateComputerDto } from "./dto/update-computer";
import { DeleteComputerDto } from "./dto/delete-computer";

export class ComputerStorageGateway implements ComputerRepository{
    async findAll(): Promise<ResponseApi<Computer>> {
        return await fetch('http://localhost:3001/computers').then(response => response.json())
            .then(({data})=>{
                return {
                    code: 200,
                    message: 'OK',
                    error: false,
                    entities: data,
                    count: data.length
                } as ResponseApi<Computer>
            }).catch(() => this.getError())

    }
    async findById(id: string): Promise<ResponseApi<Computer>> {
        return await fetch(`http://localhost:3001/computers/${id}`).then(response => response.json())
            .then(({data}) => {
                return {
                    code: 200,
                    message: 'OK',
                    error: false,
                    entities: data,
                    count: data.length
                } as ResponseApi<Computer>
            }).catch(() => this.getError())
    }
    async save(computer: SaveComputerDto): Promise<ResponseApi<Computer>> {
        return await fetch('http://localhost:3001/computers', {
            method: 'POST',
            body: JSON.stringify(computer),
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
                } as ResponseApi<Computer>
            }).catch(() => this.getError())
    }
    async update(computer: UpdateComputerDto): Promise<ResponseApi<Computer>> {
        return await fetch(`http://localhost:3001/computers/${computer.id}`, {
            method: 'PUT',
            body: JSON.stringify(computer),
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
                } as ResponseApi<Computer>
            }).catch(() => this.getError())
    }
    async delete(id: DeleteComputerDto): Promise<ResponseApi<Computer>> {
        return await fetch(`http://localhost:3001/computers/${id.id}`, {
            method: 'DELETE',
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
                } as ResponseApi<Computer>
            }).catch(() => this.getError())
    }
    getError(): ResponseApi<Computer> {
        return {
            code: 500,
            message: 'Internal Server Error',
            error: true
        } as ResponseApi<Computer>
    }
}