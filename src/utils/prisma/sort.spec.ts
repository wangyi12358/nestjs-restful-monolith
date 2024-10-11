import { sort2orderBy } from './sort';

describe('sort2orderBy', () => {
  it('should return default orderBy when sort is undefined', () => {
    expect(sort2orderBy(undefined)).toEqual({
      createdAt: 'desc',
    });
  });

  it('should return id: asc orderBy', () => {
    expect(
      sort2orderBy({
        field: 'id',
        order: 'asc',
      }),
    ).toEqual({
      id: 'asc',
    });
  });

  it('should return serviceCount: desc orderBy', () => {
    expect(
      sort2orderBy(
        {
          field: 'serviceCount',
          order: 'desc',
        },
        {
          serviceCount: 'siteOverview',
        },
      ),
    ).toEqual({
      siteOverview: {
        serviceCount: 'desc',
      },
    });
  });
});
