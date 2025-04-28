import { Module } from '@nestjs/common';

import { BooksModule } from './books/books.module';
import { SequelizeModule } from '@nestjs/sequelize';
import config from './core/orm.config';

@Module({
  imports: [SequelizeModule.forRoot(config), BooksModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
