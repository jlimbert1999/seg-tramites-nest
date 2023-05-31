

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'instituciones' })
export class Institution extends Document {

    @Prop({
        type: String,
        required: true
    })
    nombre: string;

    @Prop({
        type: String,
        required: true,
        unique: true,
        uppercase: true
    })
    sigla: string;

    @Prop({
        type: String,
        required: true,
        unique: true
    })
    codigo: string

    @Prop({
        type: Boolean,
        default: true
    })
    activo: boolean
}

export const InstitutionSchema = SchemaFactory.createForClass(Institution);


