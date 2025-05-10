export function filterDataHelper(params: any) {
  delete params.sortField;
  delete params.sortDesc;

  for (const key in params) {
    if (!params[key]) {
      delete params[key];
    }
  }

  return params;
}
