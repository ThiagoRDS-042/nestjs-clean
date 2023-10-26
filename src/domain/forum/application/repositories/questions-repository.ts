import { IPaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '../../enterprise/entities/question'

export abstract class QuestionsRepository {
  abstract create(question: Question): Promise<void>
  abstract save(question: Question): Promise<void>
  abstract findById(questionId: string): Promise<Question | null>
  abstract findManyRecent(params: IPaginationParams): Promise<Question[]>
  abstract findBySlug(slug: string): Promise<Question | null>
  abstract delete(question: Question): Promise<void>
}