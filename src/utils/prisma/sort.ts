import { SortReq } from '~/dto';

export const DEFAULT_FIELD = 'createdAt';
export const DEFAULT_ORDER = 'desc';

export function sort2orderBy(
  sort: SortReq = { field: DEFAULT_FIELD, order: DEFAULT_ORDER },
  fieldPrefix?: Record<string, string>,
) {
  const { field, order } = sort;
  if (fieldPrefix && field in fieldPrefix) {
    return {
      [fieldPrefix[field]]: order,
    };
  }
  return {
    [field]: order,
  };
}
