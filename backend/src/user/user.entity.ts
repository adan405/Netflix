import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Plan } from "./plan.enum";
import * as bcrypt from "bcrypt"
import { FavouriteMovie } from "./favouriteMovie/FavouriteMovie.entity";
import { Movie } from "src/movie/movie.entity";
@Entity()
export class User {
    @PrimaryGeneratedColumn() 
    id:number;

    @Column()
    @IsString()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(Plan)
    @Column({
        type:'enum',
        enum:Plan
    })
    @IsNotEmpty()
    choosePlan: Plan; 

    @OneToMany(()=>FavouriteMovie,(favouriteMovie)=>favouriteMovie.user)

    favouriteMovie:FavouriteMovie[];

    @BeforeInsert()
    async hashPassword(){
        if(this.password){
            this.password= await bcrypt.hash(this.password,10)
        }
    }
}