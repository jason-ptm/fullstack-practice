import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setLoadingAction } from '../../redux/app.slice';
import { handleApiResponses } from '../../redux/helpers/async-thunk.helper';
import {
  initialCreateState,
  initialDeleteState,
  initialInteractionState,
  initialListState,
  initialUpdateState,
} from '../../redux/helpers/state.helper';
import { CreatePostDto } from './dto/create.dto';
import { DeletePostDto } from './dto/delete.dto';
import { ListPostDto } from './dto/list.dto';
import { UpdatePostActionDto } from './dto/update.dto';
import { PostSchema } from './post.entity';
import { PostService } from './post.service';

const sliceName = 'post';

export const initialState = {
  create: initialCreateState<PostSchema>(),
  list: initialListState<PostSchema>(),
  update: initialUpdateState(),
  delete: initialDeleteState(),
  interact: initialInteractionState(),
};

const createAction = createAsyncThunk(
  `${sliceName}/create`,
  async (input: CreatePostDto, thunkApi) => {
    const postService = new PostService();

    thunkApi.dispatch(setLoadingAction(true));

    const response = await postService.create(input);

    return handleApiResponses(response, thunkApi);
  }
);

const findAllAction = createAsyncThunk(
  `${sliceName}/findAll`,
  async (input: ListPostDto, thunkApi) => {
    const postService = new PostService();

    thunkApi.dispatch(setLoadingAction(true));

    const response = await postService.findAll(input);

    return handleApiResponses(response, thunkApi);
  }
);

const changeSearchFilterAction = createAsyncThunk(
  `${sliceName}/changeSearchFilter`,
  async (input?: string) => {
    return input;
  }
);

const updateAction = createAsyncThunk(
  `${sliceName}/update`,
  async (input: UpdatePostActionDto, thunkApi) => {
    const postService = new PostService();

    thunkApi.dispatch(setLoadingAction(true));

    const response = await postService.update(input.id, input.data);

    return response;
  }
);

const deleteAction = createAsyncThunk(
  `${sliceName}/delete`,
  async (input: DeletePostDto, thunkApi) => {
    const postService = new PostService();

    thunkApi.dispatch(setLoadingAction(true));

    const response = await postService.delete(input.id);

    return handleApiResponses(response, thunkApi);
  }
);

const reactToPostAction = createAsyncThunk(
  `${sliceName}/giveLike`,
  async (postId: string, thunkApi) => {
    const postService = new PostService();

    const response = await postService.giveLike(postId);

    return handleApiResponses(response, thunkApi);
  }
);

export const postSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    resetListAction: (state) => {
      state.list = initialState.list;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAction.pending, (state) => {
        state.create.loading = true;
        state.create.done = false;
        state.create.error = initialState.create.error;
        state.create.item = initialState.create.item;
      })
      .addCase(createAction.fulfilled, (state, action) => {
        state.create.loading = false;
        state.create.done = true;
        state.create.error = initialState.create.error;
        state.create.item = action.payload.result;
      })
      .addCase(createAction.rejected, (state, action) => {
        state.create.loading = false;
        state.create.done = false;
        state.create.error = action.payload as string;
        state.create.item = initialState.create.item;
      })

      .addCase(findAllAction.pending, (state) => {
        state.list.loading = true;
        state.list.done = false;
        state.list.error = initialState.list.error;
        state.list.data = initialState.list.data;
        state.list.meta = initialState.list.meta;
      })
      .addCase(findAllAction.fulfilled, (state, action) => {
        state.list.loading = false;
        state.list.done = true;
        state.list.error = initialState.list.error;
        state.list.meta = action.payload.result.meta;
        state.list.data = action.payload.result.data;
      })
      .addCase(findAllAction.rejected, (state, action) => {
        state.list.loading = false;
        state.list.done = false;
        state.list.error = action.payload as string;
      })

      .addCase(updateAction.pending, (state) => {
        state.update.loading = true;
        state.update.done = false;
        state.update.error = initialState.update.error;
      })
      .addCase(updateAction.fulfilled, (state) => {
        state.update.loading = false;
        state.update.done = true;
        state.update.error = initialState.update.error;
      })
      .addCase(updateAction.rejected, (state, action) => {
        state.update.loading = false;
        state.update.done = false;
        state.update.error = action.error.message || 'Someting wrong occured';
      })

      .addCase(deleteAction.pending, (state) => {
        state.delete.loading = true;
        state.delete.done = false;
        state.delete.error = initialState.delete.error;
        state.delete.id = initialState.delete.id;
      })
      .addCase(deleteAction.fulfilled, (state, action) => {
        state.delete.loading = false;
        state.delete.done = true;
        state.delete.error = initialState.delete.error;
        state.delete.id = action.payload.result;
      })
      .addCase(deleteAction.rejected, (state, action) => {
        state.delete.loading = false;
        state.delete.done = false;
        state.delete.error = action.error.message || 'Someting wrong occured';
        state.delete.id = initialState.delete.id;
      })

      .addCase(reactToPostAction.pending, (state) => {
        state.interact.loading = true;
        state.interact.done = false;
        state.interact.error = initialState.interact.error;
        state.interact.item = initialState.interact.item;
      })
      .addCase(reactToPostAction.fulfilled, (state, action) => {
        state.interact.loading = false;
        state.interact.done = true;
        state.interact.error = initialState.interact.error;
        state.interact.item = action.payload.result;
      })
      .addCase(reactToPostAction.rejected, (state, action) => {
        state.interact.loading = false;
        state.interact.done = false;
        state.interact.error = action.error.message || 'Someting wrong occured';
        state.interact.item = initialState.interact.item;
      })

      .addCase(changeSearchFilterAction.fulfilled, (state, action) => {
        state.list.filter = action.payload as string;
      });
  },
});

export {
  changeSearchFilterAction,
  createAction,
  deleteAction,
  findAllAction,
  reactToPostAction,
  updateAction,
};
export const { resetListAction } = postSlice.actions;
export default postSlice.reducer;
