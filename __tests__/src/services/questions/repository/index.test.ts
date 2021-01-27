import { Questions } from '../../../../../@types/common/interface';
import { QuestionsRepository } from '../../../../../src/services/questions/repository';

describe('QuestionsRepository', () => {
  const repo = new QuestionsRepository();
  describe('QuestionsRepository.createNewQuestion()', () => {
    it('should successfully save users questions to the database', async () => {
      const question = 'role of eucossa in the depertment';
      const res: Questions.Quiz = await repo.createNewQuestion(question);
      expect(res).toStrictEqual<Questions.Quiz>({
        _id: 2,
        question: 'role of eucossa in the depertment',
      });
    });
  });

  describe('QuestionsRepository.FetchQuestions()', () => {
    it('should successfully fetch users questions from the database', async () => {
      const res: Array<Questions.Quiz> = await repo.FetchQuestions();
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
    });
  });
});
