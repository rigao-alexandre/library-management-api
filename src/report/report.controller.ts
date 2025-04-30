import { Controller, Get, StreamableFile } from '@nestjs/common';
import { ReportService } from './report.service';
import { BooksService } from 'src/books/books.service';
import { stringify } from 'csv-stringify';

@Controller('report')
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly booksService: BooksService,
  ) {}

  @Get('/')
  async index() {
    return this.reportService.index();
  }

  @Get('/books')
  async books() {
    const books = await this.booksService.findAll();

    const header = [
      'id',
      'title',
      'author',
      'isbn',
      'description',
      'status',
      'memberId',
      'dueDate',
      'createdAt',
      'updatedAt',
    ];

    const stream = stringify();

    stream.write(header);

    books.forEach((item) => stream.write(Object.values(item.toJSON())));

    stream.end();

    return new StreamableFile(stream, {
      type: 'text/csv',
      disposition: `attachment; filename=books-${new Date().toISOString()}.csv`,
    });
  }
}
