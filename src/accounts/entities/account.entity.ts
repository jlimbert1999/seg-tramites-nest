import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Dependency } from 'src/dependencies/entities/dependency.entity';
import { Officer } from 'src/officer/entities/officer.entity';
import { Role } from 'src/roles/entities/role.entity';



@Schema({ collection: 'cuentas' })
export class Account extends Document {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dependency'
    })
    dependencia: Dependency;

    @Prop({
        type: String,
        required: true,
        unique: true
    })
    login: string;

    @Prop({
        type: String,
        required: true
    })
    password: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: Role.name
    })
    rol: Role;


    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: Officer.name
    })
    funcionario: Officer

    @Prop({
        type: Boolean,
        default: true
    })
    activo: boolean
}

export const AccountSchema = SchemaFactory.createForClass(Account);