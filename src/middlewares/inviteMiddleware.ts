import { MessageContext } from 'vk-io';
import { NextMiddleware, NextMiddlewareReturn } from 'middleware-io';
import { stripIndents } from 'common-tags';

import { AbstractMiddleware, MiddlewareType } from '@/core';

export class InviteMiddleware implements AbstractMiddleware {
  type = MiddlewareType.BEFORE;

  middleware(
    context: MessageContext,
    next: NextMiddleware
  ): Promise<MessageContext> | NextMiddlewareReturn {
    if (context.eventType !== 'chat_invite_user') return next();

    console.log(context.senderId);

    return context.send(
      stripIndents`
      😊 Спасибо за приглашение в эту беседу!
      ⚙️ Чтобы я мог работать, выдайте мне право на чтение переписки или назначьте администратором.

      📚 Подробнее обо мне и моей настройке - https://vk.com/@tiktokbot1-info`
    );
  }
}
