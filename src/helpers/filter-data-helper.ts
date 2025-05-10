export function filterDataHelper(params) {
  delete params.sortField;
  delete params.sortDesc;

  for (const key in params) {
    if (!params[key]) {
      delete params[key];
    }
  }

  return params;
}
