import {Body, Controller, Post} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { TelegramMessageCommand } from '../application/TelegramMessageUseCase';

@Controller('notification')
export class TelegramController {

    constructor(
        private commandBus: CommandBus,
    ) {}

    @Post('telegram')
    async forTelegramHook(@Body() payload){
        return await this.commandBus.execute(new TelegramMessageCommand(payload))
    }
} 