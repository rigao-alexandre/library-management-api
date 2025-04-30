import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { HistoryService } from 'src/history/history.service';

const book: CreateBookDto = {
  title: 'The title',
  author: 'The author',
  isbn: 'The ISBN',
  description: 'The description',
};

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((book: CreateBookDto) =>
                Promise.resolve({ id: 1, ...book }),
              ),
            findAll: jest.fn().mockResolvedValue([book]),
            findOne: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                ...book,
                id,
              }),
            ),
            update: jest
              .fn()
              .mockImplementation((id: number, data: CreateBookDto) =>
                Promise.resolve({ id, ...book, ...data }),
              ),
            remove: jest.fn(),
          },
        },
        {
          provide: HistoryService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a book', async () => {
      expect(await controller.create(book)).toEqual({
        id: 1,
        ...book,
      });
      expect(service.create).toHaveBeenCalled();
      expect(service.create).toHaveBeenCalledWith(book);
    });
  });

  describe('findAll()', () => {
    it('should find all books ', async () => {
      expect((await controller.findAll()).length).toBe(1);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a book', async () => {
      expect(await controller.findOne(1)).toEqual({
        ...book,
        id: 1,
      });
      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    it('should update a book', async () => {
      expect(
        await controller.update(1, {
          title: 'updated',
        }),
      ).toEqual({
        id: 1,
        ...book,
        title: 'updated',
      });
      expect(service.update).toHaveBeenCalled();
    });
  });
});
