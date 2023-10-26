import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import {
  INotificationPros,
  Notification,
} from '@/domain/notification/enterprise/entities/notification'

type Override = Partial<INotificationPros>

export function makeNotification(
  override: Override = {},
  id?: UniqueEntityId,
): Notification {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityId(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      readAt: null,
      ...override,
    },
    id,
  )

  return notification
}
