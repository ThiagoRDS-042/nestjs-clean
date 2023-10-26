import { Either, right, left } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-type'
import { Attachment } from '../../enterprise/entities/attachment'
import { AttachmentsRepository } from '../repositories/attachments-repository'
import { Uploader } from '../storage/uploader'

interface IRequest {
  filename: string
  fileType: string
  body: Buffer
}

type IResponse = Either<InvalidAttachmentTypeError, { attachment: Attachment }>

@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(
    private attachmentsRepository: AttachmentsRepository,
    private uploader: Uploader,
  ) {}

  async execute({ body, fileType, filename }: IRequest): Promise<IResponse> {
    if (!/^(image\/(jpeg|png|jpg))$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidAttachmentTypeError(fileType))
    }

    const { url } = await this.uploader.upload({
      body,
      fileType,
      filename,
    })

    const attachment = Attachment.create({
      title: filename,
      url,
    })

    await this.attachmentsRepository.create(attachment)

    return right({ attachment })
  }
}
