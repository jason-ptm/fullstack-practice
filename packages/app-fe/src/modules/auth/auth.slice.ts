import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { between } from '../../helpers/number.helper';
import { setLoadingAction } from '../../redux/app.slice';
import { handleApiResponses } from '../../redux/helpers/async-thunk.helper';
import { initialActionState } from '../../redux/helpers/state.helper';
import { StorageService } from '../../services/StorageService';
import { AccountSchema } from '../user';
import { AuthService } from './auth.service';
import { RegisterAccountDto } from './dto/create.dto';
import { LoginDto } from './dto/login.dto';

const sliceName = 'auth';

const userInitialState: AccountSchema = {
  id: '',
  email: '',
  user: {
    id: '',
    age: 0,
    fullName: '',
  },
  password: '',
  updatedAt: '',
  createdAt: '',
};

const authenticateInitialState = {
  ...initialActionState,
  authenticated: false,
  user: userInitialState,
};

export type UpdatePasswordDto = {
  password: string;
};

const initialUpdatePassword: UpdatePasswordDto = {
  password: '',
};

const initialUpdatePasswordState = {
  ...initialActionState,
  data: initialUpdatePassword,
};

export const initialState = {
  authenticate: authenticateInitialState,
  register: authenticateInitialState,
  updatePassword: initialUpdatePasswordState,
};

const logout = createAsyncThunk(`${sliceName}/logout`, async () => {
  const authService = new AuthService();
  authService.logout();
  window.location.reload();
});

const register = createAsyncThunk(
  `${sliceName}/register`,
  async (input: RegisterAccountDto, thunkApi) => {
    const service = new AuthService();

    thunkApi.dispatch(setLoadingAction(true));

    const response = await service.register(input);

    if (between(response.statusCode, 200, 299) && response.result) {
      StorageService.setLoginData(
        response.result.token,
        JSON.stringify(response.result.user)
      );
    }

    return handleApiResponses(response, thunkApi);
  }
);

const authenticate = createAsyncThunk(
  `${sliceName}/authenticate`,
  async (input: LoginDto, thunkApi) => {
    const service = new AuthService();

    thunkApi.dispatch(setLoadingAction(true));

    const response = await service.login(input);

    if (between(response.statusCode, 200, 299) && response.result) {
      StorageService.setLoginData(
        response.result.token,
        JSON.stringify(response.result.user)
      );
    }

    return handleApiResponses(response, thunkApi);
  }
);

const getAuthenticated = createAsyncThunk(
  `${sliceName}/getAuthenticated`,
  async () => {
    const user = StorageService.getUser();

    if (!user) {
      throw new Error('user not logged in');
    }

    return {
      user: JSON.parse(user),
    };
  }
);

const authenticatorReducer = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.register.loading = true;
        state.register.error = initialState.register.error;
        state.register.done = initialState.register.done;
        state.register.authenticated = initialState.register.authenticated;
        state.register.user = initialState.register.user;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.register.loading = initialState.register.loading;
        state.register.error = initialState.register.error;
        state.register.done = true;
        state.register.authenticated = true;
        state.register.user = action.payload!.result!.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.register.loading = false;
        state.register.error = action.payload as string;
        state.register.done = false;
        state.register.authenticated = false;
        state.register.user = initialState.register.user;
      })

      .addCase(authenticate.pending, (state) => {
        state.authenticate.loading = true;
        state.authenticate.done = false;
        state.authenticate.error = initialState.authenticate.error;
        state.authenticate.authenticated = false;
        state.authenticate.user = initialState.authenticate.user;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.authenticate.loading = false;
        state.authenticate.done = true;
        state.authenticate.error = initialState.authenticate.error;
        state.authenticate.authenticated = true;
        state.authenticate.user = action.payload.result.user;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.authenticate.loading = false;
        state.authenticate.done = false;
        state.authenticate.error =
          (action.payload as string) || 'Someting wrong occured';
        state.authenticate.authenticated = false;
        state.authenticate.user = initialState.authenticate.user;
      })

      .addCase(getAuthenticated.pending, (state) => {
        state.authenticate.loading = true;
        state.authenticate.error = initialState.authenticate.error;
        state.authenticate.done = initialState.authenticate.done;
        state.authenticate.user = initialState.authenticate.user;
        state.authenticate.user = initialState.authenticate.user;
      })
      .addCase(getAuthenticated.fulfilled, (state, action) => {
        state.authenticate.loading = initialState.authenticate.loading;
        state.authenticate.error = initialState.authenticate.error;
        state.authenticate.done = true;
        state.authenticate.authenticated = true;
        state.authenticate.user = action.payload.user;
      })
      .addCase(getAuthenticated.rejected, (state, action) => {
        state.authenticate.loading = initialState.authenticate.loading;
        state.authenticate.error =
          action.error.message || 'Someting wrong occured';
        state.authenticate.done = false;
        state.authenticate.authenticated = false;
        state.authenticate.user = initialState.authenticate.user;
      })

      .addCase(logout.pending, (state) => {
        state.authenticate = authenticateInitialState;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authenticate = authenticateInitialState;
      })
      .addCase(logout.rejected, (state) => {
        state.authenticate = authenticateInitialState;
      });
  },
});

export { authenticate, getAuthenticated, logout, register };

export default authenticatorReducer.reducer;
