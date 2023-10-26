import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, ICommentProps } from './comment'
import { AnswerCommentCreatedEvent } from '../../events/answer-comment-created-event'

export interface IAnswerCommentProps extends ICommentProps {
  answerId: UniqueEntityId
}

export class AnswerComment extends Comment<IAnswerCommentProps> {
  get answerId(): UniqueEntityId {
    return this.props.answerId
  }

  static create(
    props: Optional<IAnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ): AnswerComment {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    const isNewAnswerComment = !id

    if (isNewAnswerComment) {
      answerComment.addDomainEvent(new AnswerCommentCreatedEvent(answerComment))
    }

    return answerComment
  }
}
