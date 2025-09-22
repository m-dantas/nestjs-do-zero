import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsEmail()
  readonly email: string;
}
