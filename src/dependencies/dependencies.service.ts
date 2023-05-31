import { Injectable } from '@nestjs/common';
import { CreateDependencyDto } from './dto/create-dependency.dto';
import { UpdateDependencyDto } from './dto/update-dependency.dto';
import { Dependency } from './entities/dependency.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DependenciesService {
  constructor(
    @InjectModel(Dependency.name) private dependencyModel: Model<Dependency>,
  ) { }

  async getDependenciesOfInstitucion(id_institution: string) {
    return await this.dependencyModel.find({ institucion: id_institution, activo: true })
  }
  create(createDependencyDto: CreateDependencyDto) {
    return 'This action adds a new dependency';
  }

  findAll() {
    return `This action returns all dependencies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dependency`;
  }

  update(id: number, updateDependencyDto: UpdateDependencyDto) {
    return `This action updates a #${id} dependency`;
  }

  remove(id: number) {
    return `This action removes a #${id} dependency`;
  }
}
