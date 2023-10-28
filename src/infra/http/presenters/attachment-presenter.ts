import { Attachment } from '@/domain/forum/enterprise/entities/attachment'

export interface AttachmentPresenterResponse {
  id: string
  url: string
  title: string
}

export class AttachmentPresenter {
  static toHTTP(attachment: Attachment): AttachmentPresenterResponse {
    return {
      id: attachment.id.toString(),
      url: attachment.url,
      title: attachment.title,
    }
  }
}
