import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { CreateQuestionUseCase } from '../question/create-question'
import { UniqueEntityID } from '~/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// SUT: System under test
let sut: CreateQuestionUseCase
describe('Create Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to create a question', async () => {
    // Act
    const result = await sut.execute({
      authorId: 'some-author-id',
      content: 'Some content',
      title: 'Some Question',
      attachmentIds: ['1', '2'],
    })

    // Assert
    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
    expect(inMemoryQuestionsRepository.items[0].attachments).toHaveLength(2)
    expect(inMemoryQuestionsRepository.items[0].attachments).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })
})
