import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm/repository/Repository';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { ForbiddenError } from '@casl/ability';
// import { UpdateUserPsw } from './dto/update-psw-input';
import { Action } from './entities/action.entity';
import { UserFeatureCategory } from './entities/user-feature-category.entity';
import * as bcrypt from 'bcrypt';
import { ForbiddenError } from '@casl/ability';
import { Category } from 'src/category/entities/category.entity';
import { JwtService } from '@nestjs/jwt';
import { MailingService } from 'src/mail/mailing.service';
import { UpdatePasswordDto } from './dto';
import { generateResponse } from 'src/utility/response.utill';

@Injectable()
export class UserService {

  //verify password
  async verifyPassword(password: string, password1: string) {

    try {
      const passwordMatches = await bcrypt.compare(password, password1);

      if (passwordMatches) {
        return true;
      }
      return false;
    } catch (error) {
      throw new ForbiddenException('Not valid Password', error.message);
    }
  }

  //encrypt password
  async hashPassword(password: string) {
    const saltRounds = 10;

    const hashedPassword: string = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });

    return hashedPassword;
  }

  //generate random password
  async generatePassword() {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=<>?";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    return password;
  }


  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Action)
    private actionsRepository: Repository<Action>,
    @InjectRepository(UserFeatureCategory)
    private userFeatureCategory: Repository<UserFeatureCategory>,

    readonly mailingService: MailingService
  ) { }

  //find user by id
  async findOneById(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({
        relations: ['userFeatureCategorys.actions'],
        where: { id: id }

      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);

    }
  }

  //find user by id without password
  async findOneByIdWithoutPassword(id: string): Promise<User> {
    try {


      const user = await this.usersRepository.findOne({
        relations: ['userFeatureCategorys.actions'],
        where: { id: id }

      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      delete user.password

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);

    }
  }

  //find user by email
  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      relations: ['userFeatureCategorys', 'userFeatureCategorys.actions'],

      where: { email: email }
    });
  }

  //find user by email without password
  async getOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      relations: ['userFeatureCategorys', 'userFeatureCategorys.actions'],

      where: { email: email }
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    delete user.password

    return user;
  }


  //find all users with actions
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: ['userFeatureCategorys', 'userFeatureCategorys.actions'],
      select: [
        'id',
        'username',
        'employeeId',
        'userId',
        'email',
        'lastName',
        'role',
        'status'
      ],
    });
  }


  /**
   * 
   * @param userDetails 
   * @returns 
   */
  async createUser(userDetails: CreateUserDto): Promise<any> {
    try {
      const { username, user_id, employee_id, email, role, actions, status } =
        userDetails;

      const user = await this.usersRepository.findOneBy({ email: email });
      if (user) {
        throw new BadRequestException('User already exists');
      }

      // action.map((item) => {})
      let action = [];

      //save actions
      actions.forEach(async (_action) => {
        const _actions = this.actionsRepository.create({
          action: _action.action,
          categoryId: _action.category_id,
          categoryName: _action.category_name,
          categoryType: _action.category_type,

        });
        action.push(await this.actionsRepository.save(_actions));
      });

      // encrypt password
      const password = await this.generatePassword();
      const hash = await this.hashPassword(password);

      const users = this.usersRepository.create({
        email,
        employeeId: employee_id,
        role,
        password: status ? hash : null,
        username,
        userId: user_id,
        lastName: null,
        status: status ? status : false
      });

      //save user
      const savedUser = [await this.usersRepository.save(users)];

      const userFeatureCategory = this.userFeatureCategory.create({
        users: savedUser,
        actions: action,
      });

      //save user feature category
      await this.userFeatureCategory.save(
        userFeatureCategory,
      );


      if (status) {
        await this.mailingService.sendMail(email, 'Account Created', `Your account has been created. Your password is ${password}`);
      }


      return generateResponse(
        true,
        200,
        'Account created successfully',
      );
      ;

    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Update user
   * @param id 
   * @param updateUserDto 
   * @returns null
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {

    const user = await this.findOneById(id)

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let _action = [];

    for (const item of updateUserDto.actions) {
      let action = null;

      try {
        //get exists action
        action = await this.actionsRepository.findOne({
          where: {
            id: item.id
          }
        })

        //if action exists update it 
        if (action) {
          let updatedAction = await this.actionsRepository.save({
            id: item.id,
            action: item.action,
            categoryId: item.category_id,
            categoryName: item.category_name,
            categoryType: item.category_type,
          })
          _action.push(updatedAction);
        } else {
          let newAction = await this.actionsRepository.save({
            action: item.action,
            categoryId: item.category_id,
            categoryName: item.category_name,
            categoryType: item.category_type,
          })
          _action.push(newAction);
        }
      } catch (error) {
        action = null
      }
    }

    // encrypt password
    const password = await this.generatePassword();
    const hash = await this.hashPassword(password);

    if (updateUserDto.status) {
      await this.mailingService.sendMail(updateUserDto.email, 'Account Created', `Your account has been created. Your password is ${password}`);
    }

    //update user
    await this.usersRepository.save({
      id: user.id,
      username: updateUserDto.username,
      employeeId: updateUserDto.employee_id,
      userId: updateUserDto.user_id,
      email: updateUserDto.email,
      role: updateUserDto.role,
      status: updateUserDto.status,
      password: updateUserDto.status ? hash : user.password
    })

    //update user feature category
    await this.userFeatureCategory.save({
      id: user.userFeatureCategorys.id,
      actions: _action,
    });

    return await this.findOneByIdWithoutPassword(id);


  }

  //update user password
  async updatePassword(id: string, updatePasswords: UpdatePasswordDto): Promise<any> {
    const { new_password, old_password } = updatePasswords;

    // encrypt password
    const newPassword = await this.hashPassword(new_password);


    try {
      const user = await this.findOneById(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isVerified = await this.verifyPassword(old_password, user.password);

      if (!isVerified) {
        throw new ForbiddenException('Invalid Old Password');
      }

      user.password = newPassword;

      await this.usersRepository.save(user);

      delete user.password;

      return user;

    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //delete user
  async remove(id: string): Promise<void> {
    try {
      const user = await this.findOneById(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.usersRepository.delete(id);
    }
    catch (error) {
      throw new BadRequestException(error.message);
    }
  }

}
