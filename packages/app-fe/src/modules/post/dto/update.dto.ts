export type UpdatePostDto = {
  title?: string;
  content?: string;
};

export type UpdatePostActionDto = {
  id: string;
  data: UpdatePostDto;
};
