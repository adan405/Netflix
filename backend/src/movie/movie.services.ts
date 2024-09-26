import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Movie } from "./movie.entity";
import { Repository } from "typeorm";
import { MovieDto } from "src/dto/movie.dto";

@Injectable()
export class MovieServices {
    constructor(
        @InjectRepository(Movie)
        private movieRepository: Repository<Movie>
    ) { }
    async create(movieDto: MovieDto): Promise<Movie> {
        const movie = this.movieRepository.create(movieDto);
        return this.movieRepository.save(movie)
    }
    findAll(): Promise<Movie[]> {
        return this.movieRepository.find()
    }
    findOne(id: number): Promise<Movie> {
        return this.movieRepository.findOneBy({ id })
    }
    async remove(id: number): Promise<void> {
        await this.movieRepository.delete(id);
    }
    async update(id: number, movieDto: MovieDto): Promise<Movie> {
        const movie = await this.movieRepository.findOne({ where: { id: id } })
        if (movie) {
            movie.title = movieDto.title
            movie.releaseDate = movieDto.releaseDate
            movie.genre = movieDto.genre
            movie.description = movieDto.description
            movie.image = movieDto.image
        }
        await this.movieRepository.update(id, movieDto);
        return this.findOne(id)
    }

    // search movies by category

    async findByCategory(category: string): Promise<Movie[]> {
        const query = this.movieRepository
            .createQueryBuilder('movie')
            .where('movie.genre=:category', { category })
            .getMany();

        return query;
    }
}