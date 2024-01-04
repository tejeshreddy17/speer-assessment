import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateRegisterUserDto } from './signUp.dto';
import * as argon2 from 'argon2';
import { BadRequestException } from '@nestjs/common';
import { error } from 'console';

export class CreateUserCommand {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async run(dto: CreateRegisterUserDto, reAttempts: number = 5) {
    const { firstName, lastName, password, userName, mailId } = dto;

    const user = await this.userRepository.findOne({
      where: [
        {
          mailId,
        },
        {
          userName,
        },
        {
          mailId,
          userName,
        },
      ],
    });

    if (user) {
      throw new BadRequestException(`Try for different username or mail id`);
    }

    const cryptedPassword = await argon2.hash(password);

    try {
      const user = this.userRepository.create({
        ...dto,
        cryptedPassword,
      });
      await this.userRepository.save(user);
      return { message: 'User Registered successfully' };
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY' && reAttempts > 0) {
        await this.run(dto, reAttempts - 1);
      } else {
        throw new BadRequestException(
          `Error in regsitering the user due to duplicacy.`,
        );
      }
    }
  }
}
