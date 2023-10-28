import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import {
  AttachmentPresenter,
  AttachmentPresenterResponse,
} from './attachment-presenter'

export interface QuestionDetailsPresenterResponse {
  questionId: string
  authorId: string
  authorName: string
  content: string
  title: string
  slug: string
  attachments: AttachmentPresenterResponse[]
  bestAnswerId?: string | null
  createdAt: Date
  updatedAt?: Date | null
}

export class QuestionDetailsPresenter {
  static toHTTP(
    questionDetails: QuestionDetails,
  ): QuestionDetailsPresenterResponse {
    return {
      questionId: questionDetails.questionId.toString(),
      authorId: questionDetails.authorId.toString(),
      content: questionDetails.content,
      bestAnswerId: questionDetails.bestAnswerId?.toString(),
      title: questionDetails.title,
      slug: questionDetails.slug.value,
      authorName: questionDetails.author,
      attachments: questionDetails.attachments.map(AttachmentPresenter.toHTTP),
      createdAt: questionDetails.createdAt,
      updatedAt: questionDetails.updatedAt,
    }
  }
}
