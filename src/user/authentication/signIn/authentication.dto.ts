import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthenticateUserDto {
  /*last name
   * @example johndoe17
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  userName: string;

  /*Strong password with minimum 8 letters with atleast one lower,uppercase, number,special character.
   * @example P0ssw@rd
   */
  @IsString()
  @IsNotEmpty()
  password: string;
}
