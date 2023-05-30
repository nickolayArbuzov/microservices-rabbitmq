import {Body, Controller, Get, HttpException, HttpStatus, Post, Query, Req, UploadedFile, UseInterceptors} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import fs from 'fs';
import path from 'path';
import { ensureDirSync } from '../../../utils/files-utils';

@Controller('files')
export class FileController {

    constructor(
        private commandBus: CommandBus,
    ) {}

    @Get('change-file-page')
    async changeFilePage(){
        fs
        return `<h1 >Привет мир !<h1>`
    }

    /*@Post('')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: Express.Multer.File){
        
        const dirPath = join('content', 'users', '10')

        ensureDirSync(dirPath)

        await saveFileAsync(
            join(dirPath, file.originalName),
            file.buffer,
        )
       
        return 'file upload'
    }*/

}