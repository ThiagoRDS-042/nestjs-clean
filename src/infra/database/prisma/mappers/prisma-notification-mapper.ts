import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Notification } from '@/domain/notification/enterprise/entities/notification'
import { Notification as PrismaNotification, Prisma } from '@prisma/client'

export class PrismaNotificationMapper {
  static toDomain(raw: PrismaNotification): Notification {
    return Notification.create(
      {
        title: raw.title,
        content: raw.content,
        createdAt: raw.createdAt,
        readAt: raw.readAt,
        recipientId: new UniqueEntityId(raw.recipientId),
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    notification: Notification,
  ): Prisma.NotificationUncheckedCreateInput {
    return {
      id: notification.id.toString(),
      title: notification.title,
      content: notification.content,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
      recipientId: notification.recipientId.toString(),
    }
  }
}
