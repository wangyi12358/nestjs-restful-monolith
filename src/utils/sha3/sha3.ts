import * as crypto from 'node:crypto';

export function sha3(data: string) {
  return crypto.createHash('sha3-256').update(data).digest('hex');
}

export function generateSalt(length = 16) {
  return crypto.randomBytes(length).toString('hex');
}

export function hashPassword(password: string, salt: string) {
  return sha3(password + salt);
}
