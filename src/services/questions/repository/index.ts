import { Questions } from '../../../../@types/common/interface';
import Quiz from './models/question.model';

export class QuestionsRepository implements Questions.IQuestionsRepository {
  async createNewQuestion(quiz: string): Promise<Questions.Quiz> {
    const res = await Quiz.query().insertAndFetch({ question: quiz });
    return {
      _id: res._id,
      question: res.question,
    };
  }
  async FetchQuestions(): Promise<Questions.Quiz[]> {
    let res: Questions.Quiz[] = await Quiz.query();
    res = res.map((quiz) => {
      return {
        _id: quiz._id,
        question: quiz.question,
      };
    });
    return res;
  }
}
