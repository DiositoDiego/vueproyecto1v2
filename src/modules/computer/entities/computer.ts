import { Entity } from "@/kernel/types";

export type Computer = Entity<number> & {
    _id: string,
    numSerie: string,
    modelo: string,
    iduser: string,
}