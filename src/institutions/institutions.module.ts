import { Module } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { InstitutionsController } from './institutions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Institution, InstitutionSchema } from './entities/institution.entity';

@Module({
  controllers: [InstitutionsController],
  providers: [InstitutionsService],
  imports: [
    MongooseModule.forFeature([{ name: Institution.name, schema: InstitutionSchema }])
  ],
  exports: [MongooseModule, InstitutionsService]
})
export class InstitutionsModule { }
