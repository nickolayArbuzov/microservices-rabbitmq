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
    if(command.payload.message.text.toLowerCase() === 'buy') {
      this.telegramAdapter.sendMessage('Оплатить можно здесь', command.payload.message.from.id)
    } else if(command.payload.message.text.toLowerCase() === 'get') {
      this.telegramAdapter.sendMessage('Получить файл можно здесь', command.payload.message.from.id)
    } else {
      this.telegramAdapter.sendMessage('Неизвестная комманда, только buy или get', command.payload.message.from.id)
    }
    return {status: 'success'}
  }
}