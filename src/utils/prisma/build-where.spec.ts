import { Prisma } from '@prisma/client';
import { buildWhere } from './build-where';

describe('buildWhere', () => {
  it('should return where object with all keys', () => {
    const req = { tenantId: 123 };
    const where = buildWhere<typeof req, Prisma.UserWhereInput>(req);
    expect(where).toEqual({ tenantId: 123 });
  });

  it('should return the object with only the non-empty email field', () => {
    const req = { tenantId: '', email: 'mika@gmail.com' };
    const where = buildWhere<typeof req, Prisma.UserWhereInput>(req);
    expect(where).toEqual({ email: 'mika@gmail.com' });
  });

  it('should return where object with all keys', () => {
    const req = { tenantId: 123, username: 'mika@gmail.com' };
    const where = buildWhere<typeof req, Prisma.UserWhereInput>(req, {
      username: (email) => ({
        username: {
          contains: email,
        },
      }),
    });
    expect(where).toEqual({
      tenantId: 123,
      email: { contains: 'mika@gmail.com' },
    });
  });

  it('should return where object with all keys, applying custom transformation for email', () => {
    const req = { tenantId: 123, email: 'mika@gmail.com' };
    const where = buildWhere<typeof req, Prisma.UserWhereInput>(req, {
      email: 'contains',
    });
    expect(where).toEqual({
      tenantId: 123,
      email: { contains: 'mika@gmail.com' },
    });
  });
});
