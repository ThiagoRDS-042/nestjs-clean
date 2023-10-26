import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'

export interface ICommentProps {
  authorId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date | null
}

export abstract class Comment<
  Props extends ICommentProps,
> extends AggregateRoot<Props> {
  get authorId(): UniqueEntityId {
    return this.props.authorId
  }

  get content(): string {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content

    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | undefined | null {
    return this.props.updatedAt
  }
}
