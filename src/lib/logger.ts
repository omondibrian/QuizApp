/* istanbul ignore file */
import util from 'util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createLogger = (type: string) => (...args: any[]) => {
  // eslint-disable-next-line no-console
  console[type](
    ...args.map((item) => {
      if (typeof item === 'object') {
        return util.inspect(item, { depth: 5, colors: true });
      }
      return item;
    })
  );
};

export default  {
  info: createLogger('log'),
  warn: createLogger('warning'),
  error: createLogger('error'),
};