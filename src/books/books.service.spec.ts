import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/sequelize';
import { Book } from './entities/book.entity';

const books = [
  {
    title: 'Title #1',
    author: 'Author #1',
    isbn: 'ISBN #1',
    description: 'Description #1',
  },
  {
    title: 'Title #2',
    author: 'Author #2',
    isbn: 'ISBN #2',
    description: 'Description #2',
  },
];

const book = books.at(0);

describe('BooksService', () => {
  let service: BooksService;
  let model: typeof Book;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book),
          useValue: {
            findAll: jest.fn(() => books),
            findOne: jest.fn(),
            create: jest.fn(() => book),
            remove: jest.fn(),
            destroy: jest.fn(() => book),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get<typeof Book>(getModelToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a book', () => {
      const newBook = {
        title: 'Title #1',
        author: 'Author #1',
        isbn: 'ISBN #1',
        description: 'Description #1',
      };
      expect(
        service.create({
          title: 'Title #1',
          author: 'Author #1',
          isbn: 'ISBN #1',
          description: 'Description #1',
        }),
      ).toEqual(newBook);
    });
  });

  describe('findAll()', () => {
    it('should return an array of books', async () => {
      expect(await service.findAll()).toEqual(books);
    });
  });

  describe('findOne()', () => {
    it('should get a single book', () => {
      const findSpy = jest.spyOn(model, 'findOne');
      expect(service.findOne(1));
      expect(findSpy).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('remove()', () => {
    it('should remove a book', async () => {
      const findSpy = jest.spyOn(model, 'destroy').mockReturnValue({
        destroy: jest.fn(),
      } as any);
      const retVal = await service.remove(2);
      expect(findSpy).toHaveBeenCalledWith({ where: { id: 2 } });
      expect(retVal).toBeUndefined();
    });
  });
});
