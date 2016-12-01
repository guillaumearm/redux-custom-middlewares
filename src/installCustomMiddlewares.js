const getCustomMiddleware = action => action && action.meta && action.meta.customMiddleware;

export const installCustomMiddlewares = () => middlewareAPI => next => action => {
  const customMiddleware = getCustomMiddleware(action);
  if (customMiddleware) return customMiddleware(middlewareAPI)(next)(action);
  return next(action);
};
