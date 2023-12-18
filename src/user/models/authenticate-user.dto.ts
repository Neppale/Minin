import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class AuthenticateUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}
