export const generationsMock = {
  hasNextPag: false,
  hasPreviousPage: false,
  isFirstPage: true,
  isLastPage: true,
  pageCount: 1,
  pageNumber: 1,
  pageSize: 1,
  totalItemCount: 1,
  generations: [
    {
      id: 1,
      date: '2022-06-05T17:53:08.189Z',
      generatePower: 150,
    },
  ],
};

export const generationMock = {
  id: 1,
  date: '2022-06-05T17:53:08.189Z',
  generatePower: 150,
};

export const generationsWithPageMock = {
  hasNextPag: false,
  hasPreviousPage: false,
  isFirstPage: true,
  isLastPage: true,
  pageCount: 2,
  pageNumber: 1,
  pageSize: 1,
  totalItemCount: 1,
  generations: [
    {
      id: 1,
      date: '2022-06-05T17:53:08.189Z',
      generatePower: 150,
    },
  ],
};
