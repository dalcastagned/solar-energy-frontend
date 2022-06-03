export type ReadPlants = {
    hasNextPag: boolean;
    hasPreviousPage: boolean;
    isFirstPage: boolean;
    isLastPage: boolean;
    pageCount: number;
    pageNumber: number;
    pageSize: number;
    totalItemCount: number;
    plants: Plant[];
};

export type Plant = {
  id: number;
  nickname: string;
  place: string;
  brand: string;
  model: string;
  active: boolean;
};
