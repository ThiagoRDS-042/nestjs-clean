import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
} from '@nestjs/common'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import {
  QuestionDetailsPresenter,
  QuestionDetailsPresenterResponse,
} from '../presenters/question-details-presenter'

interface IResponse {
  question: QuestionDetailsPresenterResponse
}

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private readonly getQuestionBySlug: GetQuestionBySlugUseCase) {}

  @Get()
  @HttpCode(200)
  public async handle(@Param('slug') slug: string): Promise<IResponse> {
    const result = await this.getQuestionBySlug.execute({
      slug,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { question } = result.value

    return { question: QuestionDetailsPresenter.toHTTP(question) }
  }
}
