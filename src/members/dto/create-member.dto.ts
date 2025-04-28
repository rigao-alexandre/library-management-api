import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  readonly full_name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly phone: string;
}
