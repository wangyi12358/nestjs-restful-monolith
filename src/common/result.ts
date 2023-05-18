import { ResultCode } from './resultCode';

export class Result<T> {
  constructor(data?: T, resultCode?: ResultCode) {
    this.data = data;
    if (resultCode) {
      this.code = resultCode.code;
      this.msg = resultCode.desc;
    }
  }

  code: number = ResultCode.SUCCESS.code;

  msg: string = ResultCode.SUCCESS.desc;

  success = true;

  data: T;

  timestamp: Date = new Date();

  static ok<T>(data?: T, resultCode?: ResultCode) {
    return new Result<T>(data, resultCode);
  }

  static fail(resultCode?: ResultCode) {
    if (!resultCode) {
      resultCode = ResultCode.ERROR;
    }
    return new Result<unknown>(null, resultCode);
  }

  // static ok
}
