import { ValueObject } from '@/core/entities/value-objects/value-object'

export interface ICommentWithAuthor {
  commentId: string
  content: string
  author: string
  authorID: string
  createdAt: Date
  updatedAt?: Date | null
}

export class CommentWithAuthor extends ValueObject<ICommentWithAuthor> {
  get commentId(): string {
    return this.props.commentId
  }

  get content(): string {
    return this.props.content
  }

  get author(): string {
    return this.props.author
  }

  get authorID(): string {
    return this.props.authorID
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
