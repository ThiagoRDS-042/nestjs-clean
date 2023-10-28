import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { ValueObject } from '@/core/entities/value-objects/value-object'
import { Attachment } from '../attachment'
import { Slug } from './slug'

export interface IQuestionDetails {
  questionId: UniqueEntityId
  authorId: UniqueEntityId
  author: string
  content: string
  title: string
  slug: Slug
  attachments: Attachment[]
  bestAnswerId?: UniqueEntityId | null
  createdAt: Date
  updatedAt?: Date | null
}

export class QuestionDetails extends ValueObject<IQuestionDetails> {
  get questionId(): UniqueEntityId {
    return this.props.questionId
  }

  get content(): string {
    return this.props.content
  }

  get attachments(): Attachment[] {
    return this.props.attachments
  }

  get bestAnswerId(): UniqueEntityId | null | undefined {
    return this.props.bestAnswerId
  }

  get title(): string {
    return this.props.title
  }

  get slug(): Slug {
    return this.props.slug
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

  static create(props: IQuestionDetails): QuestionDetails {
    return new QuestionDetails(props)
  }
}
