import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Member } from './entities/member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member)
    private memberModel: typeof Member,
  ) {}

  async create(createMemberDto: CreateMemberDto) {
    return this.memberModel.create(createMemberDto);
  }

  async findAll(): Promise<Member[]> {
    return this.memberModel.findAll();
  }

  async findOne(id: number): Promise<Member | null> {
    return this.memberModel.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    return this.memberModel.update(updateMemberDto, {
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<boolean> {
    // TODO: add soft deletes
    return (
      (await this.memberModel.destroy({
        where: {
          id,
        },
      })) === 1
    );
  }
}
