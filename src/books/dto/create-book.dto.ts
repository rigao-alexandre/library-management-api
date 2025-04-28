import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly author: string;

  @IsNotEmpty()
  readonly isbn: string;

  @IsNotEmpty()
  readonly description: string;
}
