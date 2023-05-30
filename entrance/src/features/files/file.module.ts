import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FileController } from './api/file.controller';

const commands = []
const queries = []

@Module({
  controllers: [FileController],
  imports: [
    CqrsModule,
  ],
  providers: [
    ...commands,
    ...queries,
  ],
})
export class FileModule {}