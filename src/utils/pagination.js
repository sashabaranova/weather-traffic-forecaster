export const defaultPaginationConfig = {
  START_INDEX: 0,
};

export const calculateLastPage = (
  dataSize,
  pageSize = 6,
  startIndexFrom = defaultPaginationConfig.START_INDEX,
) => {
  const totalPages = Math.ceil(dataSize / pageSize);
  const lastPage = totalPages + startIndexFrom - 1;
  return lastPage;
};