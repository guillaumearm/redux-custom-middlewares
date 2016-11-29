import { prop } from 'ramda';
import * as index from '../src'

describe('redux-custom-middlewares', () => {
    it('should imports src/index', () => {
        expect(index).toBeDefined();
    });
});
