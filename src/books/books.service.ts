import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
  ) {}

  async create(createBookDto: CreateBookDto) {
    return this.bookModel.create(createBookDto);
  }

  async findAll(): Promise<Book[]> {
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

  async remove(id: number): Promise<boolean> {
    // TODO: add soft deletes
    return (
      (await this.bookModel.destroy({
        where: {
          id,
        },
      })) === 1
    );
  }
}
