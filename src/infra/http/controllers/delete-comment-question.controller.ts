import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteCommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/delete-comment-on-question'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user.decorator'

@Controller('/questions/comments/:id')
export class DeleteCommentQuestionController {
  constructor(
    private readonly deleteCommentQuestion: DeleteCommentOnQuestionUseCase,
  ) {}

  @Delete()
  @HttpCode(204)
  public async handle(
    @Param('id') questionCommentId: string,
    @CurrentUser() user: UserPayload,
  ): Promise<void> {
    const authorId = user.sub

    const result = await this.deleteCommentQuestion.execute({
      authorId,
      questionCommentId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
