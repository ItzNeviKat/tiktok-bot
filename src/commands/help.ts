import { stripIndents } from 'common-tags';

import { Command, Context } from '@/core';

export const helpCommand = new Command({
  trigger: /^\/помощь|начать|start$/i,
  handler: async (context: Context) => {
    if (context.isChat && !/^\/помощь/i.test(context.text || '')) return;

    return context.send(stripIndents`
      😊 Я умею отвечать на сообщение с ссылкой на TikTok видео по этой ссылке. Предназначен для использования в беседе, но могу и в личных сообщениях :3
      📚 Подробнее обо мне и моей настройке - https://vk.com/@tiktokbot-info
    `);
  }
});
