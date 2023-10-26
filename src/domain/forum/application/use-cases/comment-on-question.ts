import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { QuestionsRepository } from '../repositories/questions-repository'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { Injectable } from '@nestjs/common'

interface IRequest {
  authorId: string
  questionId: string
  content: string
}

type IResponse = Either<
  ResourceNotFoundError,
  { questionComment: QuestionComment }
>

@Injectable()
export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    content,
    questionId,
  }: IRequest): Promise<IResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      questionId: question.id,
    })

    await this.questionCommentsRepository.create(questionComment)

    return right({ questionComment })
  }
}
