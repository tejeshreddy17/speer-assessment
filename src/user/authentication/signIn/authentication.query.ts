import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import * as argon2 from 'argon2';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateUserDto } from './authentication.dto';
import { ConfigService } from '@nestjs/config';

export type UserProfile = {
  id: number;
  firstName: string;
  lastName: string;
  mailId: string;
};
@Injectable()
export class AuthenticateUserQuery {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async run(dto: AuthenticateUserDto) {
    const { userName, password } = dto;
    let authenticatedUser;

    const user = await this.userRepository.findOne({
      where: {
        userName,
      },
    });

    if (user === null) {
      throw new NotFoundException(`User not found.`);
    }

    const isPaswordValid = await argon2.verify(user.cryptedPassword, password);

    if (!isPaswordValid) {
      throw new BadRequestException('Invalid Password');
    }

    authenticatedUser = user;
    const { firstName, lastName, mailId, id } = authenticatedUser;

    const accessToken = await this.signToken({
      firstName,
      lastName,
      mailId,
      id,
    });

    return { accessToken };
  }

  private async signToken(payload: UserProfile): Promise<string> {
    const secret = this.config.get('JWT_SECRET');
    return await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret,
    });
  }
}
