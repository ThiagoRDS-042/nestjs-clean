import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
} from '@nestjs/common'
import {
  QuestionPresenter,
  QuestionPresenterResponse,
} from '../presenters/question-presenter'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'

interface IResponse {
  question: QuestionPresenterResponse
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

    return { question: QuestionPresenter.toHTTP(question) }
  }
}
