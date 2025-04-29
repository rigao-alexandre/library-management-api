import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Book } from 'src/books/entities/book.entity';
import { Member } from 'src/members/entities/member.entity';

export enum Event {
  'CHECK IN' = 'CHECK IN',
  'CHECK OUT' = 'CHECK OUT',
}

@Table
export class History extends Model<History> {
  @ForeignKey(() => Book)
  @Column({})
  bookId: number;

  @BelongsTo(() => Book)
  book: Book;

  @ForeignKey(() => Member)
  @Column({ type: DataType.INTEGER, allowNull: false })
  memberId: number;

  @BelongsTo(() => Member)
  member: Member;

  @Column({
    type: DataType.ENUM,
    values: ['CHECK IN', 'CHECK OUT'],
    allowNull: false,
  })
  event: 'CHECK IN' | 'CHECK OUT';

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  eventDate: string | null | undefined;
}
