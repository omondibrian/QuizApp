import { Questions } from "../../../../@types/common/interface";

export class SaveQuizUsecase {
  constructor(private readonly repo: Questions.IQuestionsRepository) {}
  public async save(question: string): Promise<Questions.Quiz> {
    const res = await this.repo.createNewQuestion(question);
    return res;
  }
}
