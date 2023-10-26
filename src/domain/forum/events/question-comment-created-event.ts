import { DomainEvent } from '@/core/events/domain-event'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { QuestionComment } from '../enterprise/entities/question-comment'

export class QuestionCommentCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public questionComment: QuestionComment

  constructor(questionComment: QuestionComment) {
    this.questionComment = questionComment
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.questionComment.id
  }
}
