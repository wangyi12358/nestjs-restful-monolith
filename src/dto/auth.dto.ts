export class SourceItem {
  @IsNotEmpty()
  src: string;
  @IsNotEmpty()
  prompt: string;
}
