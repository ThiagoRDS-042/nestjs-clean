import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import {
  IAnswerCommentProps,
  AnswerComment,
} from '@/domain/forum/enterprise/entities/answer-comment'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaAnswerCommentMapper } from '@/infra/database/prisma/mappers/prisma-asnwer-comment-mapper'
import { Injectable } from '@nestjs/common'

type Override = Partial<IAnswerCommentProps>

export function makeAnswerComment(
  override: Override = {},
  id?: UniqueEntityId,
): AnswerComment {
  const answerComment = AnswerComment.create(
    {
      authorId: new UniqueEntityId(),
      answerId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answerComment
}

@Injectable()
export class AnswerCommentFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaAnswerComment(
    data: Partial<IAnswerCommentProps> = {},
  ): Promise<AnswerComment> {
    const answerComment = makeAnswerComment(data)

    await this.prisma.comment.create({
      data: PrismaAnswerCommentMapper.toPrisma(answerComment),
    })

    return answerComment
  }
}
