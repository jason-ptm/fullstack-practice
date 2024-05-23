import { PaginationDto } from '../../../types/pagination.dto';

export type ListPostDto = {
  pagination: PaginationDto;
  mine?: boolean;
};
