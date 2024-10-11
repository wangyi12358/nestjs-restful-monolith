import { generateSalt, hashPassword } from './sha3';

describe('sha3', () => {
  let salt: string;
  beforeEach(() => {
    salt = generateSalt();
  });

  it('should generate a salt', () => {
    expect(salt).toBeTruthy();
  });

  it('should generate a different salt each time', () => {
    const newSalt = generateSalt();
    expect(newSalt).not.toEqual(salt);
  });

  it('should hash a password', () => {
    const password = 'password';
    const hashedPassword = hashPassword(password, salt);
    expect(hashedPassword).toBeTruthy();
  });

  it('should hash a password consistently', () => {
    const password = 'password';
    const hashedPassword = hashPassword(password, salt);
    const newHashedPassword = hashPassword(password, salt);
    console.log('newHashedPassword==', newHashedPassword);
    expect(hashedPassword).toEqual(newHashedPassword);
  });
});
