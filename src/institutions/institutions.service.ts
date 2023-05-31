import { Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Institution } from './entities/institution.entity';
import { Model } from 'mongoose';

@Injectable()
export class InstitutionsService {
  constructor(@InjectModel(Institution.name) private institutionModel: Model<Institution>) { }

  create(createInstitutionDto: CreateInstitutionDto) {
    return 'This action adds a new institution';
  }

  findAll() {
    return `This action returns all institutions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} institution`;
  }

  update(id: number, updateInstitutionDto: UpdateInstitutionDto) {
    return `This action updates a #${id} institution`;
  }

  remove(id: number) {
    return `This action removes a #${id} institution`;
  }

  async getInstitutionsForRegister() {
    return await this.institutionModel.find({ activo: true }, "nombre sigla");
  }
}
