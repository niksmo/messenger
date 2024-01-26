import { equal } from 'assert';
import HttpTransport from './http.ts';

describe('Typescript usage suite', () => {
  it('should be able to execute a test', () => {
    console.log(HttpTransport);
    equal(1, 1);
  });
});
