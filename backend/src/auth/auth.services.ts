

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "src/dto/register.dto";
import { UserServices } from "src/user/user.services";
import * as bcrypt from "bcrypt";
import { Plan } from "src/user/plan.enum";

@Injectable()
export class AuthServices {
    constructor(
        private userService: UserServices,
        private jwtService: JwtService
    ) { }

    // Register a user
    async register(registerDto: RegisterDto) {
        const { email, password, choosePlan } = registerDto;
        const existingUser = await this.userService.findOne(email);
        if (existingUser) {
            throw new UnauthorizedException("User already exists");
        }
        const user = await this.userService.create(email, password, choosePlan);
        return { message: "User successfully registered" };
    }

    async loginUser(loginDto: any) {
        const { email, password } = loginDto;
        const user = await this.userService.findOne(email);

        if (!user) {
            throw new UnauthorizedException("Invalid credentials: User not found");
        }

        if (!user.password) {
            throw new UnauthorizedException("Invalid credentials: No password set for this user");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException("Invalid credentials: Password does not match");
        }

        const payload = { email: user.email, sub: user.id }; 
        return {
            access_token: this.jwtService.sign(payload),
            message: "Successfully logged in",
            user:user
        };
    }
  
}
