import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { StripeController } from './api/payment.controller';

const commands = []
const queries = []

@Module({
  controllers: [StripeController],
  imports: [
    CqrsModule,
  ],
  providers: [
    ...commands,
    ...queries,
  ],
})
export class StripeModule {}