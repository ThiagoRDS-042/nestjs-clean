import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-comments'
import {
  CommentPresenter,
  CommentPresenterResponse,
} from '../presenters/comment-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

interface IResponse {
  comments: CommentPresenterResponse[]
}

@Controller('/answers/:answerId/comments')
export class FetchAnswerCommentsController {
  constructor(
    private readonly fetchAnswerComments: FetchAnswerCommentsUseCase,
  ) {}

  @Get()
  @HttpCode(200)
  public async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('answerId') answerId: string,
  ): Promise<IResponse> {
    const result = await this.fetchAnswerComments.execute({
      page,
      answerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const answerComments = result.value.answerComments

    return { comments: answerComments.map(CommentPresenter.toHTTP) }
  }
}
