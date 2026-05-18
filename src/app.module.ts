import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigurationModule } from './configuration/configuration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataBaseConfig } from './configuration/interfaces/database.config.interface';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const {
          POSTGRES_DB,
          POSTGRES_HOST,
          POSTGRES_PASSWORD,
          POSTGRES_PORT,
          POSTGRES_USER,
        } = configService.get<DataBaseConfig>('database', { infer: true });

        return {
          type: 'postgres',
          host: POSTGRES_HOST,
          port: POSTGRES_PORT,
          username: POSTGRES_USER,
          password: POSTGRES_PASSWORD,
          database: POSTGRES_DB,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
