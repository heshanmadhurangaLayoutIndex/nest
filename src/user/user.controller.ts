import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UpdatePasswordDto } from './dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from '../auth/enums/index';
import { Roles } from 'src/auth/authorization/roles.decorator';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  @UseGuards(AuthGuard)
  @Roles(Role.LIADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneByIdWithoutPassword(id);
  }

  // @Get('email/:id')
  // findOneByEmail(@Param('id') email: string) {
  //   return this.userService.getOneByEmail(email);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch('reset/:id')
  updatePassword(@Param('id') id: string, @Body() updatePassword: UpdatePasswordDto) {
    return this.userService.updatePassword(id, updatePassword);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
