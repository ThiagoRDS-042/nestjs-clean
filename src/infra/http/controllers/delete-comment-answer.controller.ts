import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteCommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/delete-comment-on-answer'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user.decorator'

@Controller('/answers/comments/:id')
export class DeleteCommentAnswerController {
  constructor(
    private readonly deleteCommentAnswer: DeleteCommentOnAnswerUseCase,
  ) {}

  @Delete()
  @HttpCode(204)
  public async handle(
    @Param('id') answerCommentId: string,
    @CurrentUser() user: UserPayload,
  ): Promise<void> {
    const authorId = user.sub

    const result = await this.deleteCommentAnswer.execute({
      authorId,
      answerCommentId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
