import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

const editQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachmentsIds: z.array(z.string().uuid()),
})

type EditQuestionBodySchema = z.infer<typeof editQuestionBodySchema>

const bodyValidationPipe = new ZodValidationPipe(editQuestionBodySchema)

@Controller('/questions/:id')
export class EditQuestionController {
  constructor(private readonly editQuestion: EditQuestionUseCase) {}

  @Put()
  @HttpCode(204)
  public async handle(
    @Body(bodyValidationPipe) body: EditQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') questionId: string,
  ): Promise<void> {
    const { content, title, attachmentsIds } = body

    const authorId = user.sub

    const result = await this.editQuestion.execute({
      content,
      title,
      authorId,
      attachmentsIds,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
