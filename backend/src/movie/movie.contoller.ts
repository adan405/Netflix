import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { MovieServices } from "./movie.services";
import { MovieDto } from "src/dto/movie.dto";
import { Movie } from "./movie.entity";
import { ApiTags } from "@nestjs/swagger";


@Controller('movies')
@ApiTags("movies")
export class MovieController{
constructor(
    private movieServices:MovieServices
){}
@Post('add')
create(@Body() movieDto:MovieDto):Promise<Movie>{
    return this.movieServices.create(movieDto);
}
@Get('findAll')
findAll():Promise<Movie[]>{
    return this.movieServices.findAll()
}
@Get('find/:id')
findOne(@Param("id") id:number):Promise<Movie>{
    return this.movieServices.findOne(id)
}
@Delete('delete/:id')
remove(@Param('id') id:number):Promise<void>{
    return this.movieServices.remove(id)
} 
@Patch('update/:id')
update(@Param("id") id:number, @Body() movieDto:MovieDto):Promise<Movie>{
    return this.movieServices.update(id,movieDto)
}
//get by category

@Get('category/:category')
async getMoviesByCategory(@Param('category') category:string){
    return this.movieServices.findByCategory(category);
}

}