import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Event } from '../entities/history.entity';

export class CreateHistoryDto {
  @IsNotEmpty()
  readonly bookId: number;

  @IsNotEmpty()
  readonly memberId: number;

  @IsNotEmpty()
  @IsEnum(Event)
  readonly event: Event;

  @IsOptional()
  @IsDateString()
  readonly eventDate?: string | null | undefined;
}
