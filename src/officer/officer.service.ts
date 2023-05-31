import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOfficerDto } from './dto/create-officer.dto';
import { UpdateOfficerDto } from './dto/update-officer.dto';
import { Officer } from './entities/officer.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OfficerService {
  constructor(
    @InjectModel(Officer.name) private officerModel: Model<Officer>
  ) { }
  async create(createOfficerDto: CreateOfficerDto) {
    const { dni } = createOfficerDto
    const existeDni = await this.officerModel.findOne({ dni })
    if (existeDni) {
      throw new BadRequestException('Dni ya existe')
    }
    return await this.officerModel.create(createOfficerDto)
  }

  async findAll(limit: number, offset: number) {
    offset = offset * limit
    const [funcionarios, length] = await Promise.all(
      [
        this.officerModel.find({}).sort({ _id: -1 }).skip(offset).limit(limit),
        this.officerModel.count()
      ]
    )
    return { funcionarios, length }
  }

  findOne(id: number) {
    return `This action returns a #${id} officer`;
  }

  update(id: number, updateOfficerDto: UpdateOfficerDto) {
    return `This action updates a #${id} officer`;
  }

  remove(id: number) {
    return `This action removes a #${id} officer`;
  }
}
