import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'

export interface INotificationProps {
  recipientId: UniqueEntityId
  title: string
  content: string
  readAt?: Date | null
  createdAt: Date
}

export class Notification extends Entity<INotificationProps> {
  get recipientId(): UniqueEntityId {
    return this.props.recipientId
  }

  get title(): string {
    return this.props.title
  }

  get content(): string {
    return this.props.content
  }

  get readAt(): Date | undefined | null {
    return this.props.readAt
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  public read() {
    this.props.readAt = new Date()
  }

  static create(
    props: Optional<INotificationProps, 'createdAt'>,
    id?: UniqueEntityId,
  ): Notification {
    const notification = new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return notification
  }
}
