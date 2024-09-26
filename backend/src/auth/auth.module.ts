import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { JwtConstants } from "./jwt.constants";
import { AuthServices } from "./auth.services";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
@Module({
    imports:[UserModule,JwtModule.register({
        secret:JwtConstants.secret,
        signOptions:{expiresIn:"60m"}
    })],
    providers:[AuthServices,JwtStrategy],
    controllers:[AuthController]
})

export class AuthModule{
    constructor(){}
}