export const plantsMock = {
  hasNextPag: false,
  hasPreviousPage: false,
  isFirstPage: true,
  isLastPage: true,
  pageCount: 1,
  pageNumber: 1,
  pageSize: 1,
  totalItemCount: 1,
  plants: [
    {
      id: 1,
      nickname: 'nickname',
      place: 'place',
      brand: 'brand',
      model: 'model',
      active: true,
    },
  ],
};

export const plantMock = {
  id: 1,
  nickname: 'Apelido da Planta',
  place: 'Local da Planta',
  brand: 'Marca da Planta',
  model: 'Modelo da Planta',
  active: true,
};

export const plantsWithPageMock = {
  hasNextPag: false,
  hasPreviousPage: false,
  isFirstPage: true,
  isLastPage: true,
  pageCount: 2,
  pageNumber: 1,
  pageSize: 1,
  totalItemCount: 1,
  plants: [
    {
      id: 1,
      nickname: 'nickname2',
      place: 'place2',
      brand: 'brand2',
      model: 'model2',
      active: false,
    },
  ],
};
