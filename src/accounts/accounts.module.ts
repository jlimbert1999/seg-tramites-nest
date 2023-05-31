import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './entities/account.entity';
import { AuthModule } from '../auth/auth.module';
import { UserRoleGuard } from 'src/auth/guard/user-role.guard';
import { InstitutionsModule } from 'src/institutions/institutions.module';
import { DependenciesModule } from 'src/dependencies/dependencies.module';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, UserRoleGuard],
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    AuthModule,
    InstitutionsModule,
    DependenciesModule
  ],
  exports: [MongooseModule]
})
export class AccountsModule { }
