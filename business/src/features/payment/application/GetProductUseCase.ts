import { CommandHandler } from '@nestjs/cqrs';
import { TelegramAdapter } from '../../../adapters/telegram.adapter';

export class TelegramMessageCommand {
  constructor(
    public payload: any,
  ) {}
}

@CommandHandler(TelegramMessageCommand)
export class TelegramMessageUseCase {
  constructor(
    private telegramAdapter: TelegramAdapter,
  ) {}

  execute(command: TelegramMessageCommand){
    this.telegramAdapter.sendMessage('Привет ', command.payload.message.from.id)
    return {status: 'success'}
  }
}