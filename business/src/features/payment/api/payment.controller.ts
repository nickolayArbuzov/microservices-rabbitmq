import {Body, Controller, Get, HttpException, HttpStatus, Post, Query, Req} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Stripe } from 'stripe';
import { TelegramMessageCommand } from '../application/TelegramMessageUseCase';

const stripe = new Stripe(
    'sk_test_51Mn9BLAEgwu0dhrqiWTku3yKLEiGvx7F8AQLmVNPWXa7UPZr96oueDr77o3aFvLsoUxdCto2Pydht98r3g8JVIs700fi7K2CJP',
    {
        apiVersion: '2022-11-15'
    }
)

@Controller('stripe')
export class StripeController {

    constructor(
        private commandBus: CommandBus,
    ) {}

    @Get('buy')
    async buy(@Query('productsIds') productIds){
        

        const session = await stripe.checkout.sessions.create({
            success_url: 'http://localhost:3000/stripe/success',
            cancel_url: 'http://localhost:3000/stripe/error',
            line_items: [{
                price_data: {
                    product_data: {
                        name: `prod ids: ${productIds}`,
                        description: 'buing products',
                    },
                    unit_amount: 100 * 100,
                    currency: 'USD'
                },
                quantity: 1,
            }],
            mode: 'payment',
            client_reference_id: '999'
        })
        return session
    }

    @Get('success')
    async success(){
        return 'Success'
    }

    @Get('error')
    async error(){
        return 'Error'
    }

    @Post('webhook')
    async hook(@Req() req){
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.rawBody, req.headers['stripe-signature'], 'whsec_EuJwp9Da5yh90tGEF8tKJkwfoa2a4Vau');
            if(event.type === 'checkout.session.completed'){
                console.log('event------------', event)
            }
        }
        catch (err) {
            console.log('err--------------', err)
            throw new HttpException(`Webhook Error: ${err.message}`, HttpStatus.BAD_REQUEST);
        }
    }
}