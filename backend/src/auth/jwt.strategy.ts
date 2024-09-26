import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt,Strategy} from "passport-jwt"
import { UserServices } from "src/user/user.services";
import { JwtConstants } from "./jwt.constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private userServices:UserServices
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:JwtConstants.secret
        })
    }
    async validate(payload:any){
        const user = this.userServices.findOne(payload.email);
        if(!user){
            return null;
        }
        return {userId:payload.sub,email:payload.email}
    }
}