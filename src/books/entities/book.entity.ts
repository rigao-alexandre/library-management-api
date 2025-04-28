import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}
