import {Markup} from 'telegraf'
export function buttons(){
    return Markup.keyboard([
        ['купить'],
        ['получить'],
    ])
}