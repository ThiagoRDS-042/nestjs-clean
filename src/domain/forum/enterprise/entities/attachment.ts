import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'

export interface IAttachmentProps {
  title: string
  url: string
}

export class Attachment extends Entity<IAttachmentProps> {
  get title(): string {
    return this.props.title
  }

  get url(): string {
    return this.props.url
  }

  static create(props: IAttachmentProps, id?: UniqueEntityId): Attachment {
    const attachment = new Attachment(props, id)

    return attachment
  }
}
