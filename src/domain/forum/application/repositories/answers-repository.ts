import { IPaginationParams } from '@/core/repositories/pagination-params'
import { Answer } from '../../enterprise/entities/answer'

export abstract class AnswersRepository {
  abstract create(answer: Answer): Promise<void>
  abstract save(answer: Answer): Promise<void>
  abstract findById(answerId: string): Promise<Answer | null>
  abstract findManyByQuestionId(
    questionId: string,
    parmas: IPaginationParams,
  ): Promise<Answer[]>

  abstract delete(answer: Answer): Promise<void>
}