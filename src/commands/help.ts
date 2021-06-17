import { MessageContext } from 'vk-io';
import { stripIndents } from 'common-tags';

import { AbstractCommand, Context } from '@/core';

export class Help implements AbstractCommand {
  trigger = /^!помощь|!начать|начать$/i;
  payload = 'start';
  description = 'Помощь';

  async handler(context: Context): Promise<MessageContext> {
    return context.send(stripIndents`
      🍩 Я умею отвечать на сообщение с ссылкой на TikTok видео по этой ссылке. Предназначен для использования в беседе :3
      ☺️ Подробнее обо мне и моей настройке - https://vk.com/@tiktokbot1-info
    `);
  }
}
