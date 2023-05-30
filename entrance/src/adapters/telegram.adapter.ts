import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {AxiosInstance} from 'axios'
import { buttons } from '../features/telegram/layout/buttons';
const axios = require('axios')

@Injectable()
export class TelegramAdapter {
    private axiosInstance: AxiosInstance
    constructor(
        private configService: ConfigService,
    ) {
        const token = this.configService.get('BOT_TOKEN')
        this.axiosInstance = axios.create({
            baseURL: `https://api.telegram.org/bot${token}`
        })
    }

    async sendMessage(text: string, recipientId: number) {
        await this.axiosInstance.post('sendMessage', {
            chat_id: recipientId,
            text: text,
            reply_markup: buttons().reply_markup,
        })
    }

    async setWebhook(url: string) {
        await this.axiosInstance.post('setWebhook', {
            url: url,
        })
    }
}