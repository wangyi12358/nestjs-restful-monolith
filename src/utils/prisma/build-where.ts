export type Mapping<T, W> = Partial<{
  [K in keyof T]:
    | ((value: T[K], acc: W) => W)
    | 'contains'
    | 'dateRange'
    | 'in';
}>;

export function buildWhere<T extends Record<string, any>, W>(
  input: T,
  mapping?: Mapping<T, W>,
): W {
  return Object.entries(input).reduce<W>((acc, [key, value]) => {
    if (isNil(value)) return acc;

    const mappingValue = mapping?.[key];
    if (mappingValue) {
      if (typeof mappingValue === 'function') {
        return { ...acc, ...mappingValue(value, acc) };
      }

      switch (mappingValue) {
        case 'contains':
          return { ...acc, [key]: { contains: value } };
        case 'in':
          return { ...acc, [key]: { in: value } };
        case 'dateRange':
          if (Array.isArray(value) && value.length === 2) {
            return {
              ...acc,
              [key]: {
                gte: value[0],
                lte: value[1],
              },
            };
          }
          return acc;
      }
    }

    return { ...acc, [key]: value };
  }, {} as W);
}

export function isNil(value: unknown): value is null | undefined | '' {
  return value === null || value === undefined || value === '';
}
