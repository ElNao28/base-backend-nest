import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [],
    //   useFactory: (configService: ConfigService) => ({
    //     dialect: 'mysql',
    //     host: configService.get('HOST'),
    //     port: +configService.get('PORT'),
    //     username: configService.get('USERNAME'),
    //     password: configService.get('PASSWORD'),
    //     database: configService.get('DATABASE'),
    //     models: [],
    //   }),
    // }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
