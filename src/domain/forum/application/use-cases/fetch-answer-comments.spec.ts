import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'

import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { makeStudent } from 'test/factories/make-student'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository(
      inMemoryStudentsRepository,
    )
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch a answer comments', async () => {
    const student = makeStudent({ name: 'John Doe' })
    inMemoryStudentsRepository.items.push(student)

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        authorId: student.id,
        answerId: new UniqueEntityId('answer-1'),
      }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        authorId: student.id,
        answerId: new UniqueEntityId('answer-1'),
      }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        authorId: student.id,
        answerId: new UniqueEntityId('answer-1'),
      }),
    )

    const result = await sut.execute({
      page: 1,
      answerId: 'answer-1',
    })

    expect(result.value?.comments).toHaveLength(3)
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: 'John Doe',
        }),
        expect.objectContaining({
          author: 'John Doe',
        }),
        expect.objectContaining({
          author: 'John Doe',
        }),
      ]),
    )
  })

  it('should be able to fetch paginated answer comments', async () => {
    const student = makeStudent({ name: 'John Doe' })
    inMemoryStudentsRepository.items.push(student)

    for (let index = 0; index < 22; index++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          authorId: student.id,
          answerId: new UniqueEntityId('answer-1'),
        }),
      )
    }

    const result = await sut.execute({
      page: 2,
      answerId: 'answer-1',
    })

    expect(result.value?.comments).toHaveLength(2)
  })
})
