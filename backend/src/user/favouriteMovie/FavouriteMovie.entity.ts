import { User } from "src/user/user.entity";
import { Entity,  JoinTable,  ManyToMany,  ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "../../movie/movie.entity";

@Entity('favourite_movie')
export class FavouriteMovie {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>User,(user)=>user.favouriteMovie,{
        onDelete:'CASCADE'
    })
    user:User;

    @ManyToOne(()=>Movie,(movie)=>movie.favouriteByUsers,{
        onDelete:'CASCADE'
    })
    movie:Movie;
}