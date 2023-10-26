import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import {
  QuestionAttachment,
  IQuestionAttachmentProps,
} from '@/domain/forum/enterprise/entities/question-attachment'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

type Override = Partial<IQuestionAttachmentProps>

export function makeQuestionAttachment(
  override: Override = {},
  id?: UniqueEntityId,
): QuestionAttachment {
  const questionAttachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return questionAttachment
}

@Injectable()
export class QuestionAttachmentFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaQuestionAttachment(
    data: Partial<IQuestionAttachmentProps> = {},
  ): Promise<QuestionAttachment> {
    const questionAttachment = makeQuestionAttachment(data)

    await this.prisma.attachment.update({
      where: {
        id: questionAttachment.attachmentId.toString(),
      },
      data: { questionId: questionAttachment.questionId.toString() },
    })

    return questionAttachment
  }
}
