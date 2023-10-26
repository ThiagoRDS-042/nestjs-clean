import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, ICommentProps } from './comment'
import { QuestionCommentCreatedEvent } from '../../events/question-comment-created-event'

export interface IQuestionCommentProps extends ICommentProps {
  questionId: UniqueEntityId
}

export class QuestionComment extends Comment<IQuestionCommentProps> {
  get questionId(): UniqueEntityId {
    return this.props.questionId
  }

  static create(
    props: Optional<IQuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ): QuestionComment {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    const isNewQuestionComment = !id

    if (isNewQuestionComment) {
      questionComment.addDomainEvent(
        new QuestionCommentCreatedEvent(questionComment),
      )
    }

    return questionComment
  }
}
