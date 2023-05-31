import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Institution } from 'src/institutions/entities/institution.entity';

@Schema({ collection: 'dependencias' })
export class Dependency extends Document {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institution'
    })
    institucion: Institution;

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

export const DependencySchema = SchemaFactory.createForClass(Dependency);


