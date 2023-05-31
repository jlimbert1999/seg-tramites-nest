import { Injectable, UseGuards } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './entities/account.entity';
import mongoose, { Model, ObjectId } from 'mongoose';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,

  ) { }

  async searchAccount(offset: number, limit: number, id_institution: string, id_dependencie: string, text: string) {
    offset = offset * limit
    const query = {}
    if (id_institution) {
      Object.assign(query, { 'dependencia.institucion._id': new mongoose.Types.ObjectId(id_institution) })
      if (id_dependencie) {
        Object.assign(query, { 'dependencia._id': new mongoose.Types.ObjectId(id_dependencie) })
      }
    }
    if (text) {
      Object.assign(query, {
        $or: [
          { "funcionario.fullname": new RegExp(text, 'i') },
          { "funcionario.cargo": new RegExp(text, 'i') },
          { "funcionario.dni": new RegExp(text, 'i') }
        ],
      })
    }
    const data = await this.accountModel.aggregate([
      {
        $lookup: {
          from: "dependencias",
          localField: "dependencia",
          foreignField: "_id",
          as: "dependencia",
        },
      },
      {
        $unwind: {
          path: "$dependencia",
        },
      },
      {
        $project: {
          password: 0,
          __v: 0,
          'dependencia.activo': 0,
          'dependencia.__v': 0,
          'dependencia.codigo': 0,
          'dependencia.sigla': 0,
        }
      },
      {
        $lookup: {
          from: "instituciones",
          localField: "dependencia.institucion",
          foreignField: "_id",
          as: "dependencia.institucion",
        },
      },
      {
        $unwind: {
          path: "$dependencia.institucion",
        },
      },
      {
        $project: {
          'dependencia.institucion.activo': 0,
          'dependencia.institucion.__v': 0,
        }
      },
      {
        $lookup: {
          from: "funcionarios",
          localField: "funcionario",
          foreignField: "_id",
          as: "funcionario",
        },
      },
      {
        $unwind: {
          path: "$funcionario",
        },
      },
      {
        $project: {
          'funcionario.activo': 0,
          'funcionario.__v': 0,
        }
      },
      {
        $addFields: {
          "funcionario.fullname": {
            $concat: [
              "$funcionario.nombre",
              " ",
              { $ifNull: ["$funcionario.paterno", ""] },
              " ",
              { $ifNull: ["$funcionario.materno", ""] },
            ],
          },
        },
      },
      {
        $match: query
      },
      {
        $facet: {
          paginatedResults: [{ $skip: offset }, { $limit: limit }],
          totalCount: [
            {
              $count: 'count'
            }
          ]
        }
      }
    ]);
    console.log(query)
    const cuentas = data[0].paginatedResults
    const length = data[0].totalCount[0] ? data[0].totalCount[0].count : 0
    return { cuentas, length }
  }
  create(createAccountDto: CreateAccountDto) {
    return 'This action adds a new account';
  }
  async findAll(offset: number, limit: number) {
    const [cuentas, length] = await Promise.all(
      [
        this.accountModel.find({ _id: { $ne: process.env.ID_ROOT } }).select('login rol activo').sort({ _id: -1 }).skip(offset).limit(limit).populate({
          path: 'dependencia',
          select: 'nombre -_id',
          populate: {
            path: 'institucion',
            select: 'sigla -_id'
          }
        }).populate('funcionario'),
        this.accountModel.count({ _id: { $ne: process.env.ID_ROOT } })
      ]
    )
    return { cuentas, length }

  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
