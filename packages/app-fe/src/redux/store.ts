import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthenticatorReducer from '../modules/auth/auth.slice';
import PostReducer from '../modules/post/post.slice';
import AppSlice from './app.slice';

const rootReducer = combineReducers({
  app: AppSlice,
  authenticator: AuthenticatorReducer,
  post: PostReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
