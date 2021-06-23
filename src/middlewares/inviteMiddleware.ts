import { MessageContext } from 'vk-io';
import { NextMiddleware, NextMiddlewareReturn } from 'middleware-io';
import { stripIndents } from 'common-tags';

import { AbstractMiddleware, MiddlewareType } from '@/core';
import { adminPeerId, groupId } from '@/config';
import { vk } from '@/utils';
import { UsersGetResponse } from 'vk-io/lib/api/schemas/responses';

export class InviteMiddleware implements AbstractMiddleware {
  type = MiddlewareType.BEFORE;

  async middleware(
    context: MessageContext,
    next: NextMiddleware
  ): Promise<MessageContext | NextMiddlewareReturn> {
    if (
      context.eventType !== 'chat_invite_user' ||
      context.eventMemberId !== -groupId
    )
      return next();

    await context.send(
      stripIndents`
        😊 Спасибо за приглашение в эту беседу!
        ⚙️ Чтобы я мог работать без упоминаний, выдайте мне право на чтение переписки или назначьте администратором.
  
        📚 Подробнее обо мне и моей настройке - https://vk.com/@tiktokbot-info`
    );

    const [user]: UsersGetResponse = await vk.api.users.get({
      user_ids: context.senderId.toString()
    });

    return vk.api.messages.send({
      peer_id: adminPeerId,
      message: stripIndents`
        🙃 Меня пригласили в беседу
        
        🤔 Пригласивший человек: [id${context.senderId}|${user.first_name} ${user.last_name}]
        🔢 PeerId беседы: ${context.peerId}
      `,
      random_id: 0
    });
  }
}
