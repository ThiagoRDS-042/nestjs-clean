import { AuthenticateStudentUseCase } from './authenticate-student'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { FakerHasher } from 'test/cryptograph/fake-hasher'
import { FakeEncrypter } from 'test/cryptograph/fake-encrypter'
import { makeStudent } from 'test/factories/make-student'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakerHasher: FakerHasher
let fakerEncrypter: FakeEncrypter
let sut: AuthenticateStudentUseCase

describe('Authenticate student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakerHasher = new FakerHasher()
    fakerEncrypter = new FakeEncrypter()
    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakerHasher,
      fakerEncrypter,
    )
  })

  it('should be able to authenticate a student', async () => {
    const student = makeStudent({
      email: 'john@example.com',
      password: await fakerHasher.hash('123456'),
    })

    await inMemoryStudentsRepository.create(student)

    const result = await sut.execute({
      email: 'john@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
