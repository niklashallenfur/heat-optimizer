import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OptimizationService } from './optimization.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [OptimizationService],
})
export class AppModule {}
