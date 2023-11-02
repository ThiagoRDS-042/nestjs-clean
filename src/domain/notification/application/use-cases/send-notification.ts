import { Either, right } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { Injectable } from '@nestjs/common'

export interface IRequest {
  recipientId: string
  title: string
  content: string
}

export type IResponse = Either<null, { notification: Notification }>

@Injectable()
export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({ recipientId, content, title }: IRequest): Promise<IResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityId(recipientId),
      title,
      content,
    })

    await this.notificationsRepository.create(notification)

    return right({ notification })
  }
}
