import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
} from '@nestjs/common'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'

@Controller('/notifications/:notificationId/read')
export class ReadNotificationController {
  constructor(private readonly readNotification: ReadNotificationUseCase) {}

  @Get()
  @HttpCode(200)
  public async handle(
    @Param('notificationId') notificationId: string,
  ): Promise<void> {
    const result = await this.readNotification.execute({
      notificationId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
