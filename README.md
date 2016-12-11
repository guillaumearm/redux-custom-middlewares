# redux-custom-middlewares

middlewares inside your [FSA actions](https://github.com/acdlite/flux-standard-action)

## Motivations
`redux-custom-middlewares` allow you to dispatch middlewares inside your FSA actions.
it's like super [thunk](https://github.com/gaearon/redux-thunk) !

## Goals
- dispatch plain object actions which handle side effects
- have a contextual use of middlewares
- create redux modules


## Installation

```
npm install --save redux-custom-middlewares
```

```js
import { createStore, applyMiddleware } from 'redux';
import { installCustomMiddlewares } from 'redux-custom-middlewares';
import rootReducer from './reducers';
const initialState = {};

const store = createStore(rootReducer, initialState applyMiddleware(installCustomMiddlewares()))
```

## Usage

```js
import { customMiddleware } from 'redux-custom-middlewares';

// this custom middleware just console.log the current action
const withLoggerMiddleware = customMiddleware(
    () => next => action => {
        console.log(action);
        return next(action);
    };
);

const myActionCreator = withLoggerMiddleware((param) => ({
    type: 'MY_ACTION',
    payload: param,
}));
```

## Contributing
If you like this module, you're welcome for contributing,
take a look at [CONTRIBUTING.md](https://github.com/guillaumearm/redux-custom-middlewares/blob/master/CONTRIBUTING.md)
