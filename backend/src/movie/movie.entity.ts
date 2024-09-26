import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FavouriteMovie } from "../user/favouriteMovie/FavouriteMovie.entity";
import { User } from "src/user/user.entity";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    releaseDate: string;

    @Column()
    genre: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @OneToMany(()=>FavouriteMovie,(favouriteMovie)=>favouriteMovie.movie)
   

    favouriteByUsers:FavouriteMovie[];
}