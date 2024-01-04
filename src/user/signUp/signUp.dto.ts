import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateRegisterUserDto {
  /*
  
  *First name
   * @example John
   */
  @IsString()
  @IsNotEmpty()
  firstName: string;

  /*last name
   * @example Doe
   */
  @IsString()
  @IsNotEmpty()
  lastName: string;

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
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
