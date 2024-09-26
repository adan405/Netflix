import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class MovieDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    releaseDate: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    genre: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    image: string;
}