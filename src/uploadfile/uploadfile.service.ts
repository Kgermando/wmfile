import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as crypto from 'crypto' 
import { BufferedFile } from './file.model';


@Injectable()
export class UploadfileService {

    async uploadSingle(image: BufferedFile) {

        let uploaded_image = await this.upload(image)

        return {
            image_url: uploaded_image.url,
            message: "Successfully uploaded to MinIO S3"
        }
    }

    async uploadMany(files: BufferedFile) {

        let image1 = files['image1'][0]
        let uploaded_image1 = await this.upload(image1)

        let image2 = files['image2'][0]
        let uploaded_image2 = await this.upload(image2)

        return {
            image1_url: uploaded_image1.url,
            image2_url: uploaded_image2.url,
            message: 'Successfully uploaded mutiple image on MinioS3'
        }
    }

    public async upload(file: BufferedFile) {
        // if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
        //     throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
        // }
        let temp_filename = Date.now().toString()
        let hashedFileName = crypto.createHash('md5').update(temp_filename).digest("hex");
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        let filename = hashedFileName + ext
        const fileName: string = `${filename}`;
        const fileBuffer = file.buffer;

        return {
            url: `localhost:3000/uploadfile/${filename}`
        }
    }
}
