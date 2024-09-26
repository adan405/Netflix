import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { AuthServices } from "./auth.services";
import { RegisterDto } from "src/dto/register.dto";
import { LoginDto } from "src/dto/login.dto";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/public.decorator";

@Controller("auth")
@ApiTags("Registration")
export class AuthController{
    constructor(
        private authService:AuthServices
    ){}
    @Public()
    @Post('register')
    async register(@Body() registerDto:RegisterDto){
        return this.authService.register(registerDto)
    }
    @Public()
    @Post('login')
    async login(@Body() loginDto:LoginDto){
       
        return this.authService.loginUser(loginDto)
    }
 
    
}

