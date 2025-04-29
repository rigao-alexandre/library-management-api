import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { InjectModel } from '@nestjs/sequelize';
import { History } from './entities/history.entity';
import { Member } from 'src/members/entities/member.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History)
    private historyModel: typeof History,
  ) {}

  create(createHistoryDto: CreateHistoryDto) {
    return this.historyModel.create(createHistoryDto);
  }

  findAll() {
    return this.historyModel.findAll();
  }

  findOne(id: number) {
    return this.historyModel.findByPk(id);
  }

  // update(id: number, updateHistoryDto: UpdateHistoryDto) {
  //   return `This action updates a #${id} history`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} history`;
  // }

  findAllByBookId(id: number) {
    return this.historyModel.findAll({
      where: {
        bookId: id,
      },
      order: [['createdAt', 'DESC']],
      include: [{ model: Member, required: true }],
    });
  }
}
