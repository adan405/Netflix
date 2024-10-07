import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Movie } from "./movie.entity";
import { Repository } from "typeorm";
import { MovieDto } from "src/dto/movie.dto";
import { MoviesGateway } from "./movie.gateway";

import { v4 as uuid } from "uuid"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
@Injectable()
export class MovieServices {
    //cloud implemention
    private s3 = new S3Client({
        region: "eu-north-1",
        credentials: {
            accessKeyId: "AKIA6D6JBJN5TPKQS5X4",
            secretAccessKey: "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",
        },
        endpoint: "https://s3.eu-north-1.amazonaws.com",
    });
    constructor(
        @InjectRepository(Movie)
        private movieRepository: Repository<Movie>,
        private movieGateway: MoviesGateway
    ) { }

    //upload a movie
    async uploadFile(file: Express.Multer.File): Promise<string> {
        const fileKey = `${uuid()}-${file.originalname}`;

        const params = {
            Bucket: "amperornetflixclone",
            Key: fileKey,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        try {
            await this.s3.send(new PutObjectCommand(params))
            return `https://amperornetflixclone.s3.eu-north-1.amazonaws.com/${fileKey}`;
        } catch (error) {
            console.error('Error uploading file to S3:', error);
            throw new Error('File upload failed');
        }


    }

    async create(movieDto: MovieDto, fileUrl: string): Promise<Movie> {
        console.log('file url=====', fileUrl)
        const movie = this.movieRepository.create({ ...movieDto, movieUrl: fileUrl });
        const savedMovie = await this.movieRepository.save(movie);
        this.movieGateway.server.emit('movieCreated', savedMovie);
        return savedMovie
        // return this.movieRepository.save(movie)
    }
    findAll(offset: any, limit: number): Promise<Movie[]> {
        return this.movieRepository.find({
            skip: offset,
            take: limit,
        })
    }
    //trending movies
    trendingMovies(limit: number): Promise<Movie[]> {
        return this.movieRepository.find({
            take: limit
        })
    }
    findOne(id: number): Promise<Movie> {
        return this.movieRepository.findOneBy({ id })
    }
    async remove(id: number): Promise<void> {
        await this.movieRepository.delete(id);
        this.movieGateway.server.emit('movieDeleted', id)
    }
    // async update(id: number, movieDto: MovieDto): Promise<Movie> {
    //     const movie = await this.movieRepository.findOne({ where: { id: id } })
    //     if (movie) {
    //         movie.title = movieDto.title
    //         movie.releaseDate = movieDto.releaseDate
    //         movie.genre = movieDto.genre
    //         movie.description = movieDto.description
    //         movie.image = movieDto.image
    //     }
    //     await this.movieRepository.update(id, movieDto);
    //     this.movieGateway.server.emit('movieUpdated', { id, ...movieDto });
    //     return this.findOne(id)
    // }

    async update(id: number, movieDto: MovieDto,file?:Express.Multer.File): Promise<Movie> {
        const movie = await this.movieRepository.findOne({ where: { id } });
        
        if (!movie) {
            throw new Error('Movie not found');
        }
        let updatedFilePath = movie.movieUrl;
        if(file){
            updatedFilePath =`path/to/your/uploads/${file.filename}`
        }
        
        const updatedMovie = {
            ...movie,  
            ...(movieDto.title && { title: movieDto.title }),  
            ...(movieDto.releaseDate && { releaseDate: movieDto.releaseDate }),
            ...(movieDto.genre && { genre: movieDto.genre }),
            ...(movieDto.description && { description: movieDto.description }),
            ...(movieDto.image && { image: movieDto.image }),
        };
    
      
        await this.movieRepository.save(updatedMovie);
    
        
        this.movieGateway.server.emit('movieUpdated', { id, ...updatedMovie });
    
        return this.findOne(id);  
    }
    

    // search movies by category

    async findByCategory(category: string): Promise<Movie[]> {
        const query = await this.movieRepository
            .createQueryBuilder('movie')
            .where('movie.genre=:category', { category })
            .getMany();

        return query;
    }
}


// node mailer
// rdsservices

// dump pgadmin