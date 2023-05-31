import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { DependenciesModule } from './dependencies/dependencies.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { ApplicantsModule } from './applicants/applicants.module';
import { OfficerModule } from './officer/officer.module';
import { RolesModule } from './roles/roles.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot('mongodb://localhost/seg-tramitesDB'),
    AccountsModule,
    AuthModule,
    DependenciesModule,
    InstitutionsModule,
    ApplicantsModule,
    OfficerModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
