import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  readonly fullName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly phone: string;
}
