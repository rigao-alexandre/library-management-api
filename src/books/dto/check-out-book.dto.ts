import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CheckOutBookDto extends PartialType(CreateBookDto) {
  // status: 'CHECKED IN' | 'CHECKED OUT';

  @IsNotEmpty()
  memberId: number;

  @IsOptional()
  @IsDateString()
  dueDate?: string | null | undefined;

  @IsOptional()
  @IsDateString()
  eventDate?: string | null | undefined;
}
