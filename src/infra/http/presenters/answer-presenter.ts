import { Answer } from '@/domain/forum/enterprise/entities/answer'

export interface AnswerPresenterResponse {
  id: string
  content: string
  createdAt: Date
  updatedAt?: Date | null
}

export class AnswerPresenter {
  static toHTTP(answer: Answer): AnswerPresenterResponse {
    return {
      id: answer.id.toString(),
      content: answer.content,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    }
  }
}
