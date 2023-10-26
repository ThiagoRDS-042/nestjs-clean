import { RegisterStudentUseCase } from './register-student'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { FakerHasher } from 'test/cryptograph/fake-hasher'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakerHasher: FakerHasher
let sut: RegisterStudentUseCase

describe('Register student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakerHasher = new FakerHasher()

    sut = new RegisterStudentUseCase(inMemoryStudentsRepository, fakerHasher)
  })

  it('should be able to register a new student', async () => {
    const result = await sut.execute({
      name: 'john doe',
      email: 'john@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.items[0],
    })
  })

  it('should hash student password upon registration', async () => {
    const result = await sut.execute({
      name: 'john doe',
      email: 'john@example.com',
      password: '123456',
    })

    const hashedPassword = await fakerHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryStudentsRepository.items[0].password).toEqual(hashedPassword)
  })
})
