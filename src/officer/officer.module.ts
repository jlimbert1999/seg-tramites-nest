import { Module } from '@nestjs/common';
import { OfficerService } from './officer.service';
import { OfficerController } from './officer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Officer, OfficerSchema } from './entities/officer.entity';

@Module({
  controllers: [OfficerController],
  providers: [OfficerService],
  imports: [
    MongooseModule.forFeature([{ name: Officer.name, schema: OfficerSchema }])
  ],
  exports: [MongooseModule]
})
export class OfficerModule { }
