import { Controller, Get, Post, Body, Patch, Param, Delete, Query, SetMetadata } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidResources } from 'src/auth/interfaces/valid-roles';
import { META_RESOURCES } from 'src/auth/decorators/role-protected.decorator';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { DependenciesService } from 'src/dependencies/dependencies.service';

@Controller('cuentas')
@SetMetadata(META_RESOURCES, ValidResources.CUENTAS)

export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private institucionService: InstitutionsService,
    private dependenciesService: DependenciesService
  ) { }

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }


  @Get('instituciones')
  async getInstituciones() {
    return await this.institucionService.getInstitutionsForRegister()
  }
  @Get('dependencias/:id_institution')
  async getDependenciasForRegister(@Param('id_institution') id: string) {
    return await this.dependenciesService.getDependenciesOfInstitucion(id);
  }

  @Get('search')
  async searchAccount(
    @Query('offset') offset: string,
    @Query('limit') limit: string,
    @Query('dependencie') id_dependencie: string,
    @Query('institution') id_institution: string,
    @Query('text') text: string,
  ) {
    return await this.accountsService.searchAccount(+offset, +limit, id_institution, id_dependencie, text);
  }

  @Get()
  @Auth(ValidResources.EXTERNOS)
  async findAll(@Query('offset') offset: string, @Query('limit') limit: string) {
    return await this.accountsService.findAll(+offset, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }

}
