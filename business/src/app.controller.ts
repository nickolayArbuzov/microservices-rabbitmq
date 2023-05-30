import { Controller, Get } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('1')
  async getNotifications(@Payload() data: any, @Ctx() context: RmqContext) {
    
    const channel = context.getChannelRef()
    const message = context.getMessage()
    channel.ack(message)
    console.log('number', {data: data.data, date: new Date()} )
  }
}


