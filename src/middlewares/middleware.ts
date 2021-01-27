/* istanbul ignore file */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
const errorTypes = {
    ValidationError: 422,
    UniqueViolationError: 409,
  };
  
  const errorMessages = {
    UniqueViolationError: 'Already exists.',
  };
  
  export function notFound(req: { originalUrl: any; }, res: { status: (arg0: number) => void; }, next: (arg0: Error) => void) {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  }
  
  // eslint-disable-next-line no-unused-vars
  export function errorHandler(error: { name: string | number; message: any; stack: any; errors: any; }, _req: any, res: { statusCode: number; status: (arg0: any) => void; json: (arg0: { status: any; message: any; stack: any; errors: any; }) => void; }, _next: any) {
    const statusCode =
      res.statusCode === 200 ? errorTypes[error.name] || 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      status: statusCode,
      message: errorMessages[error.name] || error.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
      errors: error.errors || undefined,
    });
  }
  
  