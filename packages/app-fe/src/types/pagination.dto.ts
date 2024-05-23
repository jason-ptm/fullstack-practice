import { MRT_SortingState } from 'material-react-table';

// export type ColumnFilter = {
//   id: string;
//   value: unknown;
// };

export type SortingState = { state: MRT_SortingState; query?: string };
// export type FilterState = { state: ColumnFilter[]; query?: string };

export type PaginationDto = {
  page?: number;
  take?: number;
  order?: string;
  filter?: string;
};
