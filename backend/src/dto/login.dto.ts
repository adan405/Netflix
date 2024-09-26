import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class LoginDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password:string;
}