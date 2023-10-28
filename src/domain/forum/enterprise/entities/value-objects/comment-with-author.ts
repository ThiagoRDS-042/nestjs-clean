import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { ValueObject } from '@/core/entities/value-objects/value-object'

export interface ICommentWithAuthor {
  commentId: UniqueEntityId
  content: string
  author: string
  authorId: UniqueEntityId
  createdAt: Date
  updatedAt?: Date | null
}

export class CommentWithAuthor extends ValueObject<ICommentWithAuthor> {
  get commentId(): UniqueEntityId {
    return this.props.commentId
  }

  get content(): string {
    return this.props.content
  }

  get author(): string {
    return this.props.author
  }

  get authorId(): UniqueEntityId {
    return this.props.authorId
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  static create(props: ICommentWithAuthor): CommentWithAuthor {
    return new CommentWithAuthor(props)
  }
}
