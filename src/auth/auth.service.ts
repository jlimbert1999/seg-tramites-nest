import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Account } from 'src/accounts/entities/account.entity';
import { AuthDto } from './dto/auth.dto';
import { JwtPayload, userRequest } from './interfaces/payload.interface';
import { getmenuFrontend } from './helpers/menu-frontend';
import { Role } from 'src/roles/entities/role.entity';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
    private jwtService: JwtService
  ) {

  }
  async login(authDto: AuthDto) {
    const account = await this.accountModel.findOne({ login: authDto.login }).populate('funcionario').populate('rol')
    if (!account) throw new BadRequestException('login o password incorrectos')
    if (!bcrypt.compareSync(authDto.password, account.password)) throw new BadRequestException('login o password incorrectos')
    if (account._id == process.env.ID_ROOT)
      return {
        id_account: account._id,
        fullname: `ADMINISTRADOR`,
        jobtitle: 'Configuraciones',
        resources: account.rol.privileges.map(privilege => privilege.resource),
        token: this.generateToken({
          id_account: account._id
        })
      }
    if (!account.activo || !account.funcionario) throw new UnauthorizedException('La cuenta ha sido desvinculada')
    return {
      id_account: account._id,
      fullname: `${account.funcionario.nombre} ${account.funcionario.paterno} ${account.funcionario.materno}`.trim(),
      jobtitle: account.funcionario.cargo,
      resources: account.rol.privileges.map(privilege => privilege.resource),
      token: this.generateToken({
        id_account: account._id
      })
    }
  }

  async checkAuthStatus(id_account: string) {
    const account = await this.accountModel.findById(id_account, 'rol funcionario')
      .populate('funcionario')
      .populate('rol')
    const resources = account.rol.privileges.map(privilege => privilege.resource)
    if (id_account == process.env.ID_ROOT)
      return {
        id_account: account._id,
        fullname: `ADMINISTRADOR`,
        jobtitle: 'Configuraciones',
        resources,
        menu: getmenuFrontend(resources),
        token: this.generateToken({
          id_account: account._id
        })
      }
    return {
      id_account: account._id,
      fullname: `${account.funcionario.nombre} ${account.funcionario.paterno} ${account.funcionario.materno}`.trim(),
      jobtitle: account.funcionario.cargo,
      resources,
      menu: getmenuFrontend(resources),
      token: this.generateToken({
        id_account: account._id
      })
    }

  }



  private generateToken(payload: JwtPayload) {
    const token = this.jwtService.sign({
      id_account: payload.id_account
    })
    return token
  }



}
