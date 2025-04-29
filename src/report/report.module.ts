import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { BooksModule } from 'src/books/books.module';
import { HistoryModule } from 'src/history/history.module';
import { Book } from 'src/books/entities/book.entity';
import { Member } from 'src/members/entities/member.entity';
import { History } from 'src/history/entities/history.entity';

@Module({
  imports: [BooksModule, HistoryModule],
  controllers: [ReportController],
  providers: [
    ReportService,
    {
      provide: 'BookRepository',
      useValue: Book,
    },
    {
      provide: 'MemberRepository',
      useValue: Member,
    },
    {
      provide: 'HistoryRepository',
      useValue: History,
    },
  ],
})
export class ReportModule {}
