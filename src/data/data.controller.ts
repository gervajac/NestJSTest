import { Controller, Get, Post, Delete, Query, Body, Patch, Param } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')
export class DataController {

    constructor(private DataService: DataService){}

    @Post()
    createData(@Body() newData){
        console.log(newData)
        return this.DataService.createData(newData)
    }

    // @Get()
    // getData(){
    //     return this.DataService.getData()
    // }

    @Get()
    async getDataPaginated(
      @Query('page') page: number = 1,
      @Query('perPage') perPage: number = 10,
    ) {
      return await this.DataService.getDataPaginated(page, perPage);
    }

    @Get(":id")
    async getOneData(@Param("id") id: string){
        console.log(id)
        return this.DataService.getOneData(id)
    }

    @Patch(":id")
    async updateData(@Param("id") id: string, @Body() data: any){
        console.log(data, "dataaa")
        return this.DataService.updateData(id, data)
    }

    @Delete(":id")
    async deleteData(@Param("id") id: string,
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,){
        return this.DataService.deleteData(id, page, perPage)
    }

    
}
