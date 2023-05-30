import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './features/files/file.module';
import { StripeModule } from './features/payment/payment.module';
import { TelegramModule } from './features/telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({inject: [ConfigService], useFactory: (configService: ConfigService) => {
      return {
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        autoLoadEntities: false,
        synchronize: true,
        entities: []
      }
    }}),
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://hhmsghoe:pQFejKLXj8xvIKRyi-zh_eeg3D8p1vwQ@sparrow.rmq.cloudamqp.com/hhmsghoe'],
          queue: 'cats_queue',
          queueOptions: {
            durable: false
          },
          noAck: false,
        },
      },
    ]),
    FileModule,
    TelegramModule,
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
