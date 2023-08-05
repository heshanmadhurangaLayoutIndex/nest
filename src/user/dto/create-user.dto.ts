import { IsEmail, IsBoolean, IsString, IsArray, ValidateNested, IsInt, Min, Max, ArrayNotEmpty } from 'class-validator';

class Action {
  @IsString()
  id: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  action: number[];

  @IsString()
  category_id: string;

  @IsString()
  category_name: string;

  @IsString()
  category_type: string;
}

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  employee_id: string

  @IsString()
  user_id: string;

  @IsEmail()
  email: string;

  @IsString()
  role: string;

  @IsBoolean()
  isAdmin: boolean;

  @IsString()
  password: string;

  @IsBoolean()
  status: boolean;

  @ValidateNested({ each: true })
  actions: Action[];
}
