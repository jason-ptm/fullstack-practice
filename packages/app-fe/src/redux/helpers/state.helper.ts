export const initialActionState = {
  loading: false,
  error: '',
  done: false,
};

export const initialListState = <T>() => ({
  ...initialActionState,

  data: [] as T[],
  meta: {
    hasNextPage: false,
    hasPreviousPage: false,
    itemCount: 0,
    page: 1,
    pageCount: 0,
    take: 5,
  },
  filter: '',
});

export const initialViewState = <T>() => ({
  ...initialActionState,
  data: undefined as T | undefined,
});

export const initialCreateState = <T>() => ({
  ...initialActionState,
  item: undefined as T,
});

export const initialUpdateState = () => ({
  ...initialActionState,
});

export const initialDeleteState = () => ({
  ...initialActionState,
  id: '',
});

export const initialInteractionState = () => ({
  ...initialActionState,
  item: {
    liked: false,
    data: {
      id: '',
      fullName: '',
      userId: '',
    },
    postId: '',
  },
});
