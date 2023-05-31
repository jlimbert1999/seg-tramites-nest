import { ObjectId } from "mongoose"

export interface JwtPayload {
    id_account: string
}

export interface userRequest {
    id_account: string
    id_officeer?: string
    rol: {
        _id?: ObjectId,
        role: string
        privileges: {
            resource: string
            create: boolean
            update: boolean
            read: boolean
            delete: boolean
        }[]
    }
}