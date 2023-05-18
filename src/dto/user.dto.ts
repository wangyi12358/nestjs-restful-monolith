import { PageParams } from './base.dto';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UserPageReq extends PageParams {
  username: string;
}

export class CreateUserReq {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsNumberString()
  age: number;

  @IsNotEmpty()
  @IsNumberString()
  gender: number;
}
