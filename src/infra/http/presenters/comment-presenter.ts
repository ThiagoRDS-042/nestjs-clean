import { Comment } from '@/domain/forum/enterprise/entities/comment'

export interface CommentPresenterResponse {
  id: string
  content: string
  createdAt: Date
  updatedAt?: Date | null
}

export class CommentPresenter {
  static toHTTP(comment: Comment<any>): CommentPresenterResponse {
    return {
      id: comment.id.toString(),
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }
  }
}
