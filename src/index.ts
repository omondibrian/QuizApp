/* istanbul ignore file */
import App from './app';

//TODO:add the logger
import logger from './lib/logger';

const port = process.env.PORT || 5050;
App.listen(port, () => {
  logger.info(`Listening at http://localhost:${port}`);
});