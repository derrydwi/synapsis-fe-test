export const updateSearchParams = (params: Record<string, string | null>) => {
  const urlSearchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      urlSearchParams.set(key, value);
    } else {
      urlSearchParams.delete(key);
    }
  });
  return urlSearchParams.toString();
};
