import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user.decorator'

@Controller('/answers/:answerId')
export class DeleteAnswerController {
  constructor(private readonly deleteAnswer: DeleteAnswerUseCase) {}

  @Delete()
  @HttpCode(204)
  public async handle(
    @Param('answerId') answerId: string,
    @CurrentUser() user: UserPayload,
  ): Promise<void> {
    const authorId = user.sub

    const result = await this.deleteAnswer.execute({
      authorId,
      answerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
