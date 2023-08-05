import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateCallRecordDto {
  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @IsNotEmpty()
  callType: string;

  @IsString()
  @IsNotEmpty()
  problem: string;

  @IsString()
  @IsNotEmpty()
  priorityLevel: string;

  @IsString()
  @IsNotEmpty()
  callBack: string;

  @IsString()
  @IsNotEmpty()
  respond: string;

  @IsString()
  @IsNotEmpty()
  requiredAction: string;

  @IsString()
  @IsNotEmpty()
  fieldStaffInfo: string;

  @IsString()
  @IsNotEmpty()
  actionTaken: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
