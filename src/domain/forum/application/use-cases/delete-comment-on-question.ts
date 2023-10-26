import { Either, left, right } from '@/core/either'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { NotAllowedError } from '@/core/errors/not-allowed'
import { Injectable } from '@nestjs/common'

interface IRequest {
  authorId: string
  questionCommentId: string
}

type IResponse = Either<ResourceNotFoundError | NotAllowedError, null>

@Injectable()
export class DeleteCommentOnQuestionUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({ authorId, questionCommentId }: IRequest): Promise<IResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.questionCommentsRepository.delete(questionComment)

    return right(null)
  }
}
