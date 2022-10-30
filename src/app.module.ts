import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadfileModule } from './uploadfile/uploadfile.module';

@Module({
  imports: [UploadfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
