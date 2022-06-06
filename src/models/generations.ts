export type ReadGenerations = {
  hasNextPag: boolean;
  hasPreviousPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  pageCount: number;
  pageNumber: number;
  pageSize: number;
  totalItemCount: number;
  generations: Generation[];
};

export type Generation = {
  id: number;
  date: string;
  generatePower: number;
};

export type GenerationPower = {
  month: string;
  generation: number;
};
