import { IsNotEmpty } from 'class-validator';
export class LoginReq {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
