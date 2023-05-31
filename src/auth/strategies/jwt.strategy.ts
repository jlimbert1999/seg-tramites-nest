import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectModel } from "@nestjs/mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Model } from "mongoose";
import { Account } from "src/accounts/entities/account.entity";
import { JwtPayload, userRequest } from "../interfaces/payload.interface";
import { Role } from "src/roles/entities/role.entity";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(Account.name) private readonly accountModel: Model<Account>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret',
        });
    }
    async validate(payload: JwtPayload): Promise<userRequest> {
        // function for jwt validate
        const { id_account } = payload
        const account = await this.accountModel.findById(id_account).populate('rol')
      
        if (!account) throw new UnauthorizedException('Token invalid')
        if (account._id == process.env.ID_ROOT) {
            return {
                id_account: account._id,
                rol: account.rol as Role,
            }
        }
        if (!account.activo || !account.funcionario) throw new UnauthorizedException('La cuenta ha sido desvinculada')
        // add data to request
        return {
            id_account: account._id,
            id_officeer: account.funcionario._id,
            rol: account.rol as Role,
        }
    }
}   