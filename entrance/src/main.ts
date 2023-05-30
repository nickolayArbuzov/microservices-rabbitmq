import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://hhmsghoe:pQFejKLXj8xvIKRyi-zh_eeg3D8p1vwQ@sparrow.rmq.cloudamqp.com/hhmsghoe'],
      queue: 'cats_queue',
      queueOptions: {
        durable: false
      },
      noAck: false,
    },
  })

  await app.listen(3000);
}
bootstrap();

