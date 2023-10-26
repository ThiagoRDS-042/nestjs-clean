import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'

export interface IStudentProps {
  name: string
  email: string
  password: string
}

export class Student extends Entity<IStudentProps> {
  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  static create(props: IStudentProps, id?: UniqueEntityId): Student {
    const student = new Student(
      {
        ...props,
      },
      id,
    )

    return student
  }
}
