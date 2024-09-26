import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Movie } from './movie/movie.entity';
import { MovieModule } from './movie/movie.module';
import { FavouriteMovie } from './user/favouriteMovie/FavouriteMovie.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'Netflix',
    entities: [User,FavouriteMovie,Movie],
    synchronize: true,
  }),MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
