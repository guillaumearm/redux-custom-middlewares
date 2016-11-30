import { compose } from 'redux';
import arityN from 'arity-n';

export const customMiddleware = middleware => actionCreator => arityN((...args) => {
  const action = actionCreator(...args);
  return {
    ...action,
    meta: {
      ...action.meta,
      customMiddleware: middleware,
    },
  };
}, actionCreator.length);
