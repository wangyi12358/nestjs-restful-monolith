import { IsNotEmpty } from 'class-validator';
export class SourceItem {
  @IsNotEmpty()
  src: string;
  @IsNotEmpty()
  prompt: string;
}
