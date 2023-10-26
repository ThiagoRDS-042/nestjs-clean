import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'

interface IInstructorProps {
  name: string
}

export class Instructor extends Entity<IInstructorProps> {
  get name(): string {
    return this.props.name
  }

  static create(props: IInstructorProps, id?: UniqueEntityId): Instructor {
    const instructor = new Instructor(
      {
        ...props,
      },
      id,
    )

    return instructor
  }
}
