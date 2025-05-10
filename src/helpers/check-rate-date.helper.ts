import { ApiError } from '../exceptions/api-error';

export function checkRateDateHelper(createdAt, rateDate) {
  // @ts-ignore
  const diffDate = createdAt - new Date(rateDate);
  if (diffDate > 1000000) {
    throw ApiError.BadRequest('Currencies exchange rates are outdated');
  }
}
