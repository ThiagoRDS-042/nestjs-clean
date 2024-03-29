import { IPaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author'

export abstract class AnswerCommentsRepository {
  abstract create(answerComment: AnswerComment): Promise<void>
  abstract findById(answerCommentId: string): Promise<AnswerComment | null>
  abstract findManyByAnswerId(
    answerId: string,
    params: IPaginationParams,
  ): Promise<AnswerComment[]>

  abstract findManyByAnswerIdWithAuthor(
    answerId: string,
    params: IPaginationParams,
  ): Promise<CommentWithAuthor[]>

  abstract delete(answerComment: AnswerComment): Promise<void>
}
