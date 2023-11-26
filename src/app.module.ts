import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "bv0mxnu5vdqysot8juje-mysql.services.clever-cloud.com",
      port: 3306,
      username: "uulodz0sp9byop4o",
      password: "DoZOPP35XQTOHyqXfuqM",
      database: "bv0mxnu5vdqysot8juje",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true
    }),
    DataModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
