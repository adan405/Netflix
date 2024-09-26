import { User } from './user.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Movie } from 'src/movie/movie.entity';
import { Repository } from 'typeorm';
import { FavouriteMovie } from './favouriteMovie/FavouriteMovie.entity'

@Injectable()
export class UserServices {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Movie)
        private movieRepository: Repository<Movie>,
        @InjectRepository(FavouriteMovie)
        private favouriteRepository: Repository<FavouriteMovie>
    ) { }
    async findOne(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email } });
    }
    async findAll():Promise<User[]>{
        return this.userRepository.find();
    }
    async create(email: string, password: string, choosePlan): Promise<User> {
        const user = this.userRepository.create({ email, password, choosePlan });
        return this.userRepository.save(user);
    }

    //add favourite movie

    async addMovieToFavourite(userId: number, movieId: number): Promise<FavouriteMovie> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const movie = await this.movieRepository.findOne({ where: { id: movieId } });
        console.log(user,"user---")
        console.log(movie,'movie----')
        if (!user || !movie) {
            throw new Error("user or movie not found");
        }
        const favouriteMovie = this.favouriteRepository.create({user,movie});
    
        return this.favouriteRepository.save(favouriteMovie)
    }
    // Fetch user's favorite movies

    async getUserWithFavourite(userId: number): Promise<FavouriteMovie[]> {
        return this.favouriteRepository.find({
            where: { user: { id: userId } },
            relations: ['movie'],
        });
    }
    // Fetch favorite movies
    // async getFavouriteMoies(): Promise<Movie[]> {
    //     return this.movieRepository.find()            
    // }
    //Remove a movie from favorites
    async removeMovieFromFavourites(userId: number, movieId: number): Promise<void> {
     await this.favouriteRepository.delete({ user: { id: userId }, movie: { id: movieId } });
    }

    // async removeMovieFromFavourites(userId: number, movieId: number): Promise<void> {
    //     Find the favorite movie record first
    //     const favouriteMovie = await this.favouriteRepository.findOne({
    //         where: { user: { id: userId }, movie: { id: movieId } },
    //         relations: ['user', 'movie'],
    //     });
    
    //     if (!favouriteMovie) {
    //         throw new Error('Favourite movie not found');
    //     }
    
    //     await this.favouriteRepository.remove(favouriteMovie);
    // }
}