import { Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express'
import { BufferedFile } from './file.model';
import { UploadfileService } from './uploadfile.service';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('uploadfile')
export class UploadfileController {
    constructor(private readonly fileService: UploadfileService) { }

    // @Post('single')
    @UseInterceptors(FileInterceptor('image'))
    async uploadSingle(
        @UploadedFile() image: BufferedFile
    ) {
        return await this.fileService.uploadSingle(image)
    }

    @Post('many')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
    ]))
    async uploadMany(
        @UploadedFiles() files: BufferedFile,
    ) {
        return this.fileService.uploadMany(files)
    }



    @Post('upload')
    @UseInterceptors(FileInterceptor('application', {
        storage: diskStorage({
            destination: './uploads/',
            filename(_, file, callback) {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return callback(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    uploadFile(@UploadedFile() file) {
        return {
            url: `http://54.209.208.239:3000/uploadfile/${file.path}`
        }
    }


    @Get('uploads/:path')
    getImage(
        @Param('path') path,
        @Res() res: Response
    ){
        res.sendFile(path, { root: 'uploads' });
    }
}

