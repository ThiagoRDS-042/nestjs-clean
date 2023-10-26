import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import {
  AnswerAttachment,
  IAnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

type Override = Partial<IAnswerAttachmentProps>

export function makeAnswerAttachment(
  override: Override = {},
  id?: UniqueEntityId,
): AnswerAttachment {
  const answerAttachment = AnswerAttachment.create(
    {
      answerId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return answerAttachment
}

@Injectable()
export class AnswerAttachmentFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaAnswerAttachment(
    data: Partial<IAnswerAttachmentProps> = {},
  ): Promise<AnswerAttachment> {
    const answerAttachment = makeAnswerAttachment(data)

    await this.prisma.attachment.update({
      where: {
        id: answerAttachment.attachmentId.toString(),
      },
      data: { answerId: answerAttachment.answerId.toString() },
    })

    return answerAttachment
  }
}
