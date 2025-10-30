import { IsAdmin } from './is-admin';

describe('IsAdmin', () => {
  it('should create an instance', () => {
    const directive = new IsAdmin();
    expect(directive).toBeTruthy();
  });
});
