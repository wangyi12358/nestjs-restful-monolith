import { IsNotEmpty } from 'class-validator';

export class PageParams {
  @IsNotEmpty()
  current: number;
  @IsNotEmpty()
  pageSize: number;

  get take() {
    return (this.current - 1) * this.pageSize;
  }
}

export class SortReq {
  @IsNotEmpty()
  field: string;
  @IsNotEmpty()
  order: 'asc' | 'desc';
}
