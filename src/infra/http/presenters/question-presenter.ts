import { Question } from '@/domain/forum/enterprise/entities/question'

export interface QuestionPresenterResponse {
  id: string
  title: string
  slug: string
  bestAnswerId?: string | null
  createdAt: Date
  updatedAt?: Date | null
}

export class QuestionPresenter {
  static toHTTP(question: Question): QuestionPresenterResponse {
    return {
      id: question.id.toString(),
      title: question.title,
      slug: question.slug.value,
      bestAnswerId: question.bestAnswerId?.toString(),
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }
}
