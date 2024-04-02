import { RoleToStringPipe } from './role-to-string.pipe';

describe('RoleToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new RoleToStringPipe();
    expect(pipe).toBeTruthy();
  });
});
