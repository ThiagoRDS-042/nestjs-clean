import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import {
  IQuestionCommentProps,
  QuestionComment,
} from '@/domain/forum/enterprise/entities/question-comment'
import { PrismaQuestionCommentMapper } from '@/infra/database/prisma/mappers/prisma-question-comment-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

type Override = Partial<IQuestionCommentProps>

export function makeQuestionComment(
  override: Override = {},
  id?: UniqueEntityId,
): QuestionComment {
  const questionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return questionComment
}

@Injectable()
export class QuestionCommentFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaQuestionComment(
    data: Partial<IQuestionCommentProps> = {},
  ): Promise<QuestionComment> {
    const questionComment = makeQuestionComment(data)

    await this.prisma.comment.create({
      data: PrismaQuestionCommentMapper.toPrisma(questionComment),
    })

    return questionComment
  }
}
