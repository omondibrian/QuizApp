import { Questions } from "../../../../@types/common/interface";

export class FetchQuizUsecase {
  constructor(private readonly repo: Questions.IQuestionsRepository) {}

  async fetch(): Promise<Array<Questions.Quiz>> {
    const res: Array<Questions.Quiz> = await this.repo.FetchQuestions();
    return res;
  }
}
