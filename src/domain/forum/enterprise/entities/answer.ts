import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { AnswerAttachmentList } from './answer-attachment-list'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { AnswerCreatedEvent } from '../../events/answer-created-event'

export interface IAnswerProps {
  questionId: UniqueEntityId
  authorId: UniqueEntityId
  attachments: AnswerAttachmentList
  content: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Answer extends AggregateRoot<IAnswerProps> {
  get content(): string {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content

    this.touch()
  }

  get attachments(): AnswerAttachmentList {
    return this.props.attachments
  }

  set attachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments

    this.touch()
  }

  get questionId(): UniqueEntityId {
    return this.props.questionId
  }

  get authorId(): UniqueEntityId {
    return this.props.authorId
  }

  get excerpt(): string {
    return this.props.content.substring(0, 120).trimEnd().concat('...')
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | undefined | null {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<IAnswerProps, 'createdAt' | 'attachments'>,
    id?: UniqueEntityId,
  ): Answer {
    const answer = new Answer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        attachments: props.attachments ?? new AnswerAttachmentList(),
      },
      id,
    )

    const isNewAnswer = !id

    if (isNewAnswer) {
      answer.addDomainEvent(new AnswerCreatedEvent(answer))
    }

    return answer
  }
}
