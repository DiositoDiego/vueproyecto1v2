import { Entity } from "@/kernel/types";

export type User = Entity<number> & {
    nombre: string,
    apellido: string,
    telefono: string,
    edad: number,
    direccion: string,
}