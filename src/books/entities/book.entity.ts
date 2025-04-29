import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { History } from 'src/history/entities/history.entity';
import { Member } from 'src/members/entities/member.entity';

@Table
export class Book extends Model<Book> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  isbn: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.ENUM,
    values: ['CHECKED IN', 'CHECKED OUT'],
    allowNull: false,
    defaultValue: 'CHECKED IN',
  })
  status: 'CHECKED IN' | 'CHECKED OUT';

  @ForeignKey(() => Member)
  @Column({
    allowNull: true,
  })
  memberId?: number | null | undefined;

  @BelongsTo(() => Member)
  member?: Member | null | undefined;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  dueDate?: string | null | undefined;

  @HasMany(() => History)
  history: History[];
}
