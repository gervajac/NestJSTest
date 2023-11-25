import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import { Data } from './data.entity';

@Injectable()
export class DataService {

    constructor(@InjectRepository(Data) private dataRepository: Repository<Data>) {}

    async createData(data: any){
        try{
            const newData = await this.dataRepository.create(data)
            return this.dataRepository.save(newData)
        } catch(err: any){
            console.log(err)
        }
    }

    async getData(){
        try{
            const newData = await this.dataRepository.find()
            return newData
        } catch(err: any){
            console.log(err)
        }
    }

    async getDataPaginated(page, perPage){
        const skip = (page - 1) * perPage;
        try{
            const [dataFound, totalData] = await this.dataRepository.findAndCount({
                skip,
                take: perPage
              });
              const totalPages = Math.ceil(totalData / perPage);
              const numbersArray = Array.from({ length: totalPages }, (_, i) => i + 1);

              return {
                totalData: totalData,
                totalPages: totalPages,
                currentPage: page,
                numbersArray: numbersArray,
                dataFound: dataFound
              }
        } catch(err: any){
            console.log(err)
        }
    }

    async getOneData(id: string){
        try{
            const newData = await this.dataRepository.findOne({
                where: {
                    id: id
                }
            })
            if(!newData) return new HttpException("Articulo no encontrado", HttpStatus.NOT_FOUND);
            return newData;
        } catch(err: any){
            console.log(err)
        }
    }

    async updateData(id: string, data: any) {
        console.log(id)
        console.log(data)
        const dataFound = await this.dataRepository.findOne({
           where: {
               id: id
              }
        })
        if(!dataFound) return new HttpException("Articulo no encontrado", HttpStatus.NOT_FOUND);
        const updateData = Object.assign(dataFound, data)
          await this.dataRepository.save(updateData)
          const allData = await this.dataRepository.find();
          return { data: allData, message: "Articulo actualizado exitosamente" }
       }

       async deleteData(id: string, page, perPage) {
        const skip = (page - 1) * perPage;
    
        try {
            const dataFound = await this.dataRepository.findOne({ where: { id: id } });
    
            if (!dataFound) {
                return new HttpException("Articulo no encontrado", HttpStatus.NOT_FOUND);
            }
    
            const deletionResult = await this.dataRepository.delete({ id: id });
    
            if (deletionResult.affected === 0) {
                return new HttpException("Error al eliminar el artículo", HttpStatus.INTERNAL_SERVER_ERROR);
            }
    
            const [dataAfterDeletion, totalData] = await this.dataRepository.findAndCount({
                skip,
                take: perPage,
            });
    
            const totalPages = Math.ceil(totalData / perPage);
            const numbersArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    
            return {
                totalData: totalData,
                totalPages: totalPages,
                currentPage: page,
                numbersArray: numbersArray,
                dataFound: dataFound,
                dataAfterDeletion: dataAfterDeletion,
                message: "Articulo eliminado exitosamente",
            };
        } catch (err: any) {
            console.log(err);
            return new HttpException("Error en el servidor", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
