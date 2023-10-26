import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'

export interface IAnswerAttachmentProps {
  answerId: UniqueEntityId
  attachmentId: UniqueEntityId
}

export class AnswerAttachment extends Entity<IAnswerAttachmentProps> {
  get answerId(): UniqueEntityId {
    return this.props.answerId
  }

  get attachmentId(): UniqueEntityId {
    return this.props.attachmentId
  }

  static create(
    props: IAnswerAttachmentProps,
    id?: UniqueEntityId,
  ): AnswerAttachment {
    const answerAttachment = new AnswerAttachment(props, id)

    return answerAttachment
  }
}
