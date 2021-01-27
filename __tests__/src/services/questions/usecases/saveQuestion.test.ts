import { Questions } from '../../../../../@types/common/interface';
import { SaveQuizUsecase } from '../../../../../src/services/questions/usecases/saveQuestion';

class QuizMockRepo implements Questions.IQuestionsRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createNewQuestion(quiz: string): Promise<Questions.Quiz> {
      throw new Error('Method not implemented.' + quiz);
    }
    FetchQuestions(): Promise<Questions.Quiz[]> {
      throw new Error('Method not implemented.');
    }
  }
  
describe('saveQuestion', () => {
  const mockRepo = new QuizMockRepo();
  const usecase = new SaveQuizUsecase(mockRepo);
  const create = jest.spyOn(mockRepo, 'createNewQuestion');
  create.mockImplementation(async (quiz) => {
    return {
      _id: 2,
      question: quiz,
    };
  });
  it('should succesfully add question', async () => {
    const question = 'test quiz';
    const res = await usecase.save(question);
    expect(res).toStrictEqual<Questions.Quiz>({
      _id: 2,
      question: 'test quiz',
    });
    //then check if validate was called once
    expect(mockRepo.createNewQuestion).toHaveBeenCalledWith(question);
    create.mockClear();
  });
});
