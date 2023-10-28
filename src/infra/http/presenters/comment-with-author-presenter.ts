import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'

export interface CommentWithAuthorPresenterResponse {
  commentId: string
  authorId: string
  authorName: string
  content: string
  createdAt: Date
  updatedAt?: Date | null
}

export class CommentWithAuthorPresenter {
  static toHTTP(
    commentWithAuthor: CommentWithAuthor,
  ): CommentWithAuthorPresenterResponse {
    return {
      commentId: commentWithAuthor.commentId.toString(),
      authorId: commentWithAuthor.authorId.toString(),
      content: commentWithAuthor.content,
      authorName: commentWithAuthor.author,
      createdAt: commentWithAuthor.createdAt,
      updatedAt: commentWithAuthor.updatedAt,
    }
  }
}
