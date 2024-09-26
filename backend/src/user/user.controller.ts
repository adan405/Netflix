import { Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UserServices } from "./user.services";
import { ApiTags } from "@nestjs/swagger";
import { User } from "./user.entity";
import { Movie } from "src/movie/movie.entity";

@Controller("users")
@ApiTags("Add To Favourite Collection")
export class UserController{
    constructor(
        private userServices:UserServices
    ){}
    @Get('findAll')
    findAll():Promise<User[]>{
        return this.userServices.findAll()
    }
    @Post(':userId/favourite/:movieId')
    async addToFavourite(@Param('userId') userId:number, @Param('movieId') movieId:number){
        return this.userServices.addMovieToFavourite(userId,movieId);
    }
    @Get(':id/favourites')
    async FavouriteMoies(@Param("id") userId:number){
        return await this.userServices.getUserWithFavourite(userId)
    }
    // getFavouriteMoies():Promise<Movie[]>{
    //     return this.userServices.findAll()
    // }
    @Delete(':userId/favourite/:movieId')
    async removeToFavourite(@Param('userId') userId:number, @Param('movieId') movieId:number){
        return this.userServices.removeMovieFromFavourites(userId,movieId)
    }
}