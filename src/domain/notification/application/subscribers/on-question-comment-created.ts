import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { QuestionCommentCreatedEvent } from '@/domain/forum/events/question-comment-created-event'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OnQuestionCommentCreated implements EventHandler {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewQuestionCommentNotification.bind(this),
      QuestionCommentCreatedEvent.name,
    )
  }

  private async sendNewQuestionCommentNotification({
    questionComment,
  }: QuestionCommentCreatedEvent) {
    const question = await this.questionsRepository.findById(
      questionComment.questionId.toString(),
    )

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        content: `A pergunta "${question.excerpt}" recebeu um novo comentário!`,
        title: 'Sua pergunta foi comentada!',
      })
    }
  }
}
