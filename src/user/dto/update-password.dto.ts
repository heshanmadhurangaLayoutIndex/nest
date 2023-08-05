import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {

    @IsNotEmpty()
    readonly old_password: string;

    @IsNotEmpty()
    readonly new_password: string;
}