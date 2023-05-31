

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

class Privileges {
    @Prop({
        type: String,
        enum: [
            'externos',
            'internos',
            'entradas',
            'salidas',
            'tipos',
            'usuarios',
            'cuentas',
            'roles',
            'instituciones',
            'dependencias',
            'reportes',
            'reporte-solicitante',
            'reporte-tipo',
            'reporte-unidad',
            'reporte-usuario',
            'archivos',
            'busquedas',
        ]
    })
    resource: string;

    @Prop({ type: Boolean })
    create: boolean

    @Prop({ type: Boolean })
    update: boolean

    @Prop({ type: Boolean })
    read: boolean

    @Prop({ type: Boolean })
    delete: boolean

}

@Schema({ collection: 'roles' })
export class Role extends Document {

    @Prop({
        type: String,
        required: true,
        uppercase: true
    })
    role: string;

    @Prop({ _id: false, type: mongoose.Types.Array })
    privileges: Privileges[]


}

export const RoleSchema = SchemaFactory.createForClass(Role);


