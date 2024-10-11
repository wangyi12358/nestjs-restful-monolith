export class ResultCode {
  static SUCCESS: ResultCode = ResultCode.of(0, '操作成功');

  static ERROR: ResultCode = ResultCode.of(1000, '系统繁忙,请稍后再试!');
  static API_CERT_SECRET_EMPTY: ResultCode = ResultCode.of(
    1001,
    '凭证不能为空',
  );
  static API_CERT_WRONG_FORMAT: ResultCode = ResultCode.of(
    1002,
    '参数签名有误',
  );

  static API_FILE_GENERATION_FAILURE: ResultCode = ResultCode.of(
    1003,
    '文件发布失败',
  );
  static API_PARAMS_ERROR: ResultCode = ResultCode.of(1004, '参数错误');
  static NOT_AUTHORIZED: ResultCode = ResultCode.of(1005, '用户名密码错误!');

  // user
  static USERNAME_EXISTS: ResultCode = ResultCode.of(2000, 'username已存在!');

  constructor(code: number, desc: string) {
    this.code = code;
    this.desc = desc;
  }

  code: number;
  desc: string;

  static of(code: number, desc: string): ResultCode {
    return new ResultCode(code, desc);
  }
}
