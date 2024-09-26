import { IsNotEmpty, IsString } from "class-validator";
import { Plan } from "src/user/plan.enum";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password:string

    @ApiProperty()
    
    choosePlan:Plan
}