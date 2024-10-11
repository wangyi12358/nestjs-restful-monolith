import { IsNotEmpty, IsNumberString } from 'class-validator';
import { PageParams } from './base.dto';

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

  role: number;
}

export class UpdateUserReq {
  age: number;
  gender: number;
}
