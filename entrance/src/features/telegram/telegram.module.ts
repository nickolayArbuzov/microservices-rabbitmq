import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TelegramAdapter } from '../../adapters/telegram.adapter';
import { TelegramController } from './api/telegram.controller';
import { TelegramMessageUseCase } from './application/TelegramMessageUseCase';

const commands = [TelegramMessageUseCase]

@Module({
  controllers: [TelegramController],
  imports: [
    CqrsModule,
  ],
  providers: [
    TelegramAdapter,
    ...commands,
  ],
})
export class TelegramModule {}