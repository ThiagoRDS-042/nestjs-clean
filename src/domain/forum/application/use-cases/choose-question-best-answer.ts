import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed'
import { Question } from '../../enterprise/entities/question'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Injectable } from '@nestjs/common'

interface IRequest {
  authorId: string
  answerId: string
}

type IResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { question: Question }
>

@Injectable()
export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({ authorId, answerId }: IRequest): Promise<IResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return right({ question })
  }
}
