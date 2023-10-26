import { UseCaseError } from '@/core/errors/use-case-errors'

export class QuestionAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Question '${identifier}' already exists.`)
  }
}
