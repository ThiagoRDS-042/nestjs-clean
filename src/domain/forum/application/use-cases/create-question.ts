import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { QuestionsRepository } from '../repositories/questions-repository'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list'
import { Injectable } from '@nestjs/common'
import { QuestionAlreadyExistsError } from './errors/question-already-exists'

interface IRequest {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type IResponse = Either<QuestionAlreadyExistsError, { question: Question }>

@Injectable()
export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    content,
    title,
    attachmentsIds,
  }: IRequest): Promise<IResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })

    const questionWithSameSlug = await this.questionsRepository.findBySlug(
      question.slug.value,
    )

    if (questionWithSameSlug) {
      return left(new QuestionAlreadyExistsError(question.slug.value))
    }

    const questionAttachments = attachmentsIds.map((attachmentId) =>
      QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      }),
    )

    question.attachments = new QuestionAttachmentList(questionAttachments)

    await this.questionsRepository.create(question)

    return right({ question })
  }
}
