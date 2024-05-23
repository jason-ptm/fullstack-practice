import { between } from '../../helpers/number.helper';
import { getErrorInText } from '../../helpers/translateErrors.helper';
import { ApiResponse } from '../../types/api-response';
import { setErrorAction, setLoadingAction } from '../app.slice';
import { AsyncThunkConfig, GetThunkAPI } from '../types';

export const handleApiResponses = <T>(
  response: ApiResponse<T>,
  thunkAPI: GetThunkAPI<AsyncThunkConfig>
) => {
  thunkAPI.dispatch(setLoadingAction(false));
  switch (true) {
    case between(response.statusCode, 200, 299):
      thunkAPI.dispatch(setErrorAction(undefined));
      return response;
    case between(response.statusCode, 400, 499):
      thunkAPI.dispatch(setErrorAction(getErrorInText(response.message)));
      return thunkAPI.rejectWithValue(getErrorInText(response.message));
  }
};
