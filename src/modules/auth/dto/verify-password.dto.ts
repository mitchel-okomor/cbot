import { IsString, IsNotEmpty } from 'class-validator';

//modify this validation
export class VerifyPasswordDTO {
  @IsNotEmpty()
  @IsString()
  password: string;
}
