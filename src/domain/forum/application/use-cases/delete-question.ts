import { Either, left, right } from '@/core/either'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { NotAllowedError } from '@/core/errors/not-allowed'
import { Injectable } from '@nestjs/common'

interface IRequest {
  questionId: string
  authorId: string
}

type IResponse = Either<ResourceNotFoundError | NotAllowedError, null>

@Injectable()
export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({ questionId, authorId }: IRequest): Promise<IResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionsRepository.delete(question)

    return right(null)
  }
}
