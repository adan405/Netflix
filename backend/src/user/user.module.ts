import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserServices } from "./user.services";
import { AuthModule } from "src/auth/auth.module";
import { UserController } from "./user.controller";
import { FavouriteMovie } from "./favouriteMovie/FavouriteMovie.entity";
import { MovieModule } from "src/movie/movie.module";
@Module({
    imports:[TypeOrmModule.forFeature([User,FavouriteMovie]),forwardRef(()=>MovieModule)],
    providers:[UserServices],
    controllers:[UserController],
    exports:[UserServices]
})
export class UserModule{
constructor(){}
}