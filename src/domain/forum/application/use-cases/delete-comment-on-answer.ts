import { right, Either, left } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { NotAllowedError } from '@/core/errors/not-allowed'
import { Injectable } from '@nestjs/common'

interface IRequest {
  authorId: string
  answerCommentId: string
}

type IResponse = Either<ResourceNotFoundError | NotAllowedError, null>

@Injectable()
export class DeleteCommentOnAnswerUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({ authorId, answerCommentId }: IRequest): Promise<IResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right(null)
  }
}
