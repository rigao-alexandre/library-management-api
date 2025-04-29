import { Module } from '@nestjs/common';

import { BooksModule } from './books/books.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { MembersModule } from './members/members.module';
import { HistoryModule } from './history/history.module';
import config from './core/orm.config';

@Module({
  imports: [
    SequelizeModule.forRoot(config),
    BooksModule,
    MembersModule,
    HistoryModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
