/* istanbul ignore file */
import { Router } from 'express';
import { QuestionsRepository } from '../../services/questions/repository';
import { FetchQuizUsecase } from '../../services/questions/usecases/fetchQuiz';
import { SaveQuizUsecase } from '../../services/questions/usecases/saveQuestion';

const repo = new QuestionsRepository();
const createQuizUsecase = new SaveQuizUsecase(repo);
const fetchQuizUsecase = new FetchQuizUsecase(repo);

const questionsRouter = Router();

questionsRouter.get('/', async (_req, res, next) => {
  try {
    const result = await fetchQuizUsecase.fetch();
    res.json({ result }).status(200);
  } catch (error) {
    next(error);
  }
});

questionsRouter.post('/', async (req, res, next) => {
  try {
    const result = await createQuizUsecase.save(req.body.question);
    res.json({ result }).status(200);
  } catch (error) {
    next(error);
  }
});

export default questionsRouter;
