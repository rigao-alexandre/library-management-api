import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { HistoryModule } from 'src/history/history.module';

@Module({
  imports: [SequelizeModule.forFeature([Book]), HistoryModule],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
