import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Movie } from "./movie.entity";
import { MovieServices } from "./movie.services";
import { MovieController } from "./movie.contoller";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";
import { MoviesGateway } from "./movie.gateway";

@Module({
    imports:[TypeOrmModule.forFeature([Movie]),AuthModule,forwardRef(()=>UserModule)],
    providers:[MovieServices,MoviesGateway],
    controllers:[MovieController],
    exports:[TypeOrmModule]
})
export class MovieModule{
    constructor(){}
} 