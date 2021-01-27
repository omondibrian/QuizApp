import { Questions } from '../../../../../@types/common/interface';
import { FetchQuizUsecase } from '../../../../../src/services/questions/usecases/fetchQuiz';

class QuizMockRepo implements Questions.IQuestionsRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createNewQuestion(quiz: string): Promise<Questions.Quiz> {
    throw new Error('Method not implemented.' + quiz);
  }
  FetchQuestions(): Promise<Questions.Quiz[]> {
    throw new Error('Method not implemented.');
  }
}

describe('FetchQuiz', () => {
  const mockRepo = new QuizMockRepo();
  const usecase = new FetchQuizUsecase(mockRepo);
  const fetch = jest.spyOn(mockRepo, 'FetchQuestions');
  fetch.mockImplementation(async () => {
    return [
      {
        _id: 1,
        question: 'what does EUCCOSA stand for',
      },
      {
        _id: 2,
        question: 'role of eucossa in the depertment',
      },
    ];
  });
  it('should succesfully fetch all questions', async () => {
    const res = await usecase.fetch();
    expect(res).toStrictEqual<Array<Questions.Quiz>>([
      {
        _id: 1,
        question: 'what does EUCCOSA stand for',
      },
      {
        _id: 2,
        question: 'role of eucossa in the depertment',
      },
    ]);
    //then check if validate was called once
    expect(mockRepo.FetchQuestions).toHaveBeenCalledTimes(1);
    fetch.mockClear();
  });
});
