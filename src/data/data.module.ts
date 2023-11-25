import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import {TypeOrmModule} from "@nestjs/typeorm"
import { DataService } from './data.service';
import { Data } from './data.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Data])],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
