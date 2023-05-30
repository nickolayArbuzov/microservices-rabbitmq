import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor (
    @Inject('test') private client: ClientProxy
  ) {}

  getHello(): string {
    for(let i = 0; i < 100; i++){
      console.log('i', new Date() )
      this.client.emit('1', {data: i, date: new Date()})
    }
    
    return 'Hello World!';
  }
}
