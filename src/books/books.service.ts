import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CheckOutBookDto } from './dto/check-out-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
  ) {}

  create(createBookDto: CreateBookDto) {
    return this.bookModel.create(createBookDto);
  }

  findAll() {
    return this.bookModel.findAll();
  }

  async findOne(id: number): Promise<Book | null> {
    return this.bookModel.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookModel.update(updateBookDto, {
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    await this.bookModel.destroy({
      where: {
        id,
      },
    });
  }

  async checkOut(id: number, checkOutBook: CheckOutBookDto) {
    return this.bookModel.update(
      {
        memberId: checkOutBook.memberId,
        dueDate: checkOutBook.dueDate,
        status: 'CHECKED OUT',
      },
      {
        where: { id },
      },
    );
  }

  async checkIn(id: number) {
    return this.bookModel.update(
      {
        memberId: null,
        dueDate: null,
        status: 'CHECKED IN',
      },
      {
        where: { id },
      },
    );
  }
}
