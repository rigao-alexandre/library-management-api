import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from 'src/books/entities/book.entity';
import { Member } from 'src/members/entities/member.entity';
import { History } from 'src/history/entities/history.entity';
import sequelize from 'sequelize';
import { Op } from 'sequelize';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
    @InjectModel(Member)
    private memberModel: typeof Member,
    @InjectModel(History)
    private historyModel: typeof History,
  ) {}

  async index() {
    return {
      books: {
        totalByStatus: await this.countBooksByStatus(),
        totalByDeadline: await this.countBooks(),
        rankings: {
          monthly: await this.booksRanking(30),
        },
      },
      members: {
        total: await this.countMembers(),
        rankings: {
          weekly: await this.membersRanking(7),
        },
      },
      history: await this.history(30),
    };
  }

  private async countMembers() {
    return this.memberModel.count();
  }

  private async countBooksByStatus() {
    return this.bookModel.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'total'],
      ],
      group: 'status',
    });
  }

  private async countBooks() {
    const [results] = await this.bookModel.sequelize.query(`
        SELECT
            SUM(1) AS total,
            SUM(CASE WHEN date(dueDate) > date() THEN 1 ELSE 0 END) AS totalOnTime,
            SUM(CASE WHEN dueDate = date() THEN 1 ELSE 0 END) AS totalToday,
            SUM(CASE WHEN dueDate < date() THEN 1 ELSE 0 END) AS totalDelayed
        FROM
            books
    `);

    return results.at(0);
  }

  private async membersRanking(days: number) {
    return this.historyModel.findAll({
      attributes: [
        'member.id',
        'member.fullName',
        [sequelize.literal(`COUNT(DISTINCT(${'bookId'}))`), 'total'],
      ],
      where: {
        event: 'CHECK OUT',
        createdAt: {
          [Op.gte]: sequelize.literal(`date('now' , '-${days} days')`),
        },
      },
      group: ['memberId', 'event'],
      include: [{ model: Member, required: true }],
      order: [['total', 'DESC']],
      limit: 5,
    });
  }

  private async booksRanking(days: number) {
    return this.historyModel.findAll({
      attributes: [
        'book.id',
        'book.title',
        [sequelize.fn('COUNT', sequelize.col('bookId')), 'total'],
      ],
      where: {
        event: 'CHECK OUT',
        createdAt: {
          [Op.gte]: sequelize.literal(`date('now' , '-${days} days')`),
        },
      },
      group: ['bookId', 'event'],
      include: [{ model: Book, required: true }],
      order: [['total', 'DESC']],
      limit: 10,
    });
  }

  private async history(days: number) {
    return this.historyModel.findAll({
      attributes: [
        'event',
        [sequelize.literal(`date(${'createdAt'})`), 'date'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'total'],
      ],
      where: {
        createdAt: {
          [Op.gte]: sequelize.literal(`date('now' , '-${days} days')`),
        },
      },
      group: ['event', 'date'],
      order: [['createdAt', 'ASC']],
      limit: days,
    });
  }
}
