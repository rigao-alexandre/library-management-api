import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Member extends Model<Member> {
  @ApiProperty({ description: 'Full name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName: string;

  @ApiProperty({ description: 'Email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ description: 'Phone' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;
}
