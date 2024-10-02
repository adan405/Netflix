// import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
// import { MovieServices } from "./movie.services";
// import { MovieDto } from "src/dto/movie.dto";
// import { Movie } from "./movie.entity";
// import { ApiTags } from "@nestjs/swagger";
// import { FileInterceptor } from "@nestjs/platform-express";


// @Controller('movies')
// @ApiTags("movies")
// export class MovieController {
//     constructor(
//         private movieServices: MovieServices
//     ) { }
//     @Post('add')
//     @UseInterceptors(FileInterceptor('file'))
//     async create(
//         @Body() movieDto: MovieDto,
//         @UploadedFile() file: Express.Multer.File 
// ): Promise<Movie> {
//     const fileUrl = await this.movieServices.uploadMovie(file)
//         return this.movieServices.create(movieDto,fileUrl);
//     }
//     @Get('findAll')
//     async findAll(
//         @Query('page') page: number = 1,
//         @Query('limit') limit: number = 10,
//     ): Promise<Movie[]> {
//         const offset = (page - 1) * limit;
//         return this.movieServices.findAll(offset, limit)
//     }
//     @Get('find/:id')
//     findOne(@Param("id") id: number): Promise<Movie> {
//         return this.movieServices.findOne(id)
//     }
//     @Delete('delete/:id')
//     remove(@Param('id') id: number): Promise<void> {
//         return this.movieServices.remove(id)
//     }
//     @Patch('update/:id')
//     update(@Param("id") id: number, @Body() movieDto: MovieDto): Promise<Movie> {
//         return this.movieServices.update(id, movieDto)
//     }
//     //get by category

//     @Get('category/:category')
//     async getMoviesByCategory(@Param('category') category: string) {
//         return this.movieServices.findByCategory(category);
//     }


    
// }







import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { MovieServices } from "./movie.services";
import { MovieDto } from "src/dto/movie.dto";
import { Movie } from "./movie.entity";
import { ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('movies')
@ApiTags("movies")
export class MovieController {
    constructor(
        private movieServices: MovieServices
    ) { }
    @Post('add')
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Body() movieDto: MovieDto,
        @UploadedFile() file: Express.Multer.File 
): Promise<Movie> {
    const fileUrl = await this.movieServices.uploadFile(file)
        return this.movieServices.create(movieDto,fileUrl);
    }
    @Get('findAll')
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<Movie[]> {
        const offset = (page - 1) * limit;
        return this.movieServices.findAll(offset, limit)
    }
    @Get('find/:id')
    findOne(@Param("id") id: number): Promise<Movie> {
        return this.movieServices.findOne(id)
    }
    @Delete('delete/:id')
    remove(@Param('id') id: number): Promise<void> {
        return this.movieServices.remove(id)
    }
    @Patch('update/:id')
    update(@Param("id") id: number, @Body() movieDto: MovieDto): Promise<Movie> {
        return this.movieServices.update(id, movieDto)
    }
    //get by category

    @Get('category/:category')
    async getMoviesByCategory(@Param('category') category: string) {
        return this.movieServices.findByCategory(category);
    }


    
}