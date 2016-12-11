import { prop, is, always, identity } from 'ramda';
import * as index from '../src'

const isFunction = is(Function);

describe('redux-custom-middlewares', () => {
  const install = index.installCustomMiddlewares;
  const customMiddleware = index.customMiddleware;

  it('should imports src/index', () => {
    expect(index).toBeDefined();
  });

  describe('installCustomMiddlewares', () => {
    it('should expose installCustomMiddlewares', () => {
      expect(install).toBeDefined();
      expect(isFunction(install)).toBe(true);
    });

    it('should call next', () => {
      const middleware = install();
      const next = jest.fn(identity);
      const action = { type: 'MOCKED_ACTION' };
      const returnedNext = middleware('middlewareAPI')(next)(action);
      expect(returnedNext).toBe(action);
      expect(next).toBeCalledWith(action);
    });

    it('should call meta.customMiddleware', () => {
      const middleware = install();
      const next = jest.fn(identity);
      const action = {
        type: 'MOCKED_ACTION_WITH_CUSTOM_MIDDLEWARE',
        meta: {
          customMiddleware: jest.fn(() => next => action => {
            return next(action);
          }),
        },
      };
      const returnedNext = middleware('middlewareAPI')(next)(action);
      expect(next).toBeCalledWith(action);
      expect(returnedNext).toEqual(action);
      expect(action.meta.customMiddleware).toBeCalledWith('middlewareAPI');
    });
  });

  describe('customMiddleware enhancer', () => {
    it('should expose customMiddleware', () => {
      expect(customMiddleware).toBeDefined();
      expect(isFunction(customMiddleware)).toBe(true);
    });

    describe('enhance action creators with meta.customMiddleware', () => {
      it('works without meta', () => {
        const actionCreator = jest.fn((payload) => ({
          type: 'MOCKED_ACTION',
          payload,
        }));
        const withCustomMiddleware = customMiddleware('customMiddleware');
        const action = withCustomMiddleware(actionCreator)('mocked payload');
        expect(action.meta.customMiddleware).toBe('customMiddleware');
        expect(actionCreator).toBeCalledWith('mocked payload');
        expect({
          ...actionCreator('mocked payload'),
          meta: {
            customMiddleware: 'customMiddleware',
          },
        }).toEqual(action);
      });

      it('works with meta', () => {
        const actionCreator = jest.fn((payload) => ({
          type: 'MOCKED_ACTION',
          payload,
          meta: { test: true },
        }));
        const withCustomMiddleware = customMiddleware('customMiddleware');
        const action = withCustomMiddleware(actionCreator)('mocked payload');
        expect(action.meta.customMiddleware).toBe('customMiddleware');
        expect(actionCreator).toBeCalledWith('mocked payload');
        expect({
          ...actionCreator('mocked payload'),
          meta: {
            test: true,
            customMiddleware: 'customMiddleware',
          },
        }).toEqual(action);
      });
    });
  });
});
