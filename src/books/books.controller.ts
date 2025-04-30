import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { HistoryService } from 'src/history/history.service';
import { CheckOutBookDto } from './dto/check-out-book.dto';
import { Event } from 'src/history/entities/history.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Book')
@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly historyService: HistoryService,
  ) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }

  @Get('/:id/history')
  async findAllHistoryByBookId(@Param('id') id: number) {
    return this.historyService.findAllByBookId(id);
  }

  @Post('/:id/check-out')
  async checkOut(
    @Param('id') id: number,
    @Body() checkOutBook: CheckOutBookDto,
  ) {
    const bookUpdate = await this.booksService.checkOut(id, checkOutBook);

    if (bookUpdate) {
      return this.historyService.create({
        bookId: id,
        memberId: checkOutBook.memberId,
        event: 'CHECK OUT' as Event,
        eventDate: checkOutBook.eventDate,
      });
    }
  }

  @Post('/:id/check-in')
  async checkIn(@Param('id') id: number) {
    const book = await this.booksService.findOne(id);

    const bookUpdate = await this.booksService.checkIn(id);

    if (bookUpdate) {
      return this.historyService.create({
        bookId: id,
        memberId: book.dataValues.memberId,
        event: 'CHECK IN' as Event,
        eventDate: null,
      });
    }
  }
}
