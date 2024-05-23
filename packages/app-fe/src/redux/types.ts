import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { FallbackIfUnknown } from '@reduxjs/toolkit/dist/tsHelpers';

export type AppDispatch = ThunkDispatch<any, any, AnyAction>;

export interface AsyncThunkConfig {
  state?: any;
  dispatch?: AppDispatch;
  extra?: any;
  rejectValue?: any;
  serializedErrorType?: any;
  pendingMeta?: any;
  fulfilledMeta?: any;
  rejectedMeta?: any;
}

type GetState<ThunkApiConfig> = ThunkApiConfig extends {
  state: infer State;
}
  ? State
  : unknown;

type GetExtra<ThunkApiConfig> = ThunkApiConfig extends {
  extra: infer Extra;
}
  ? Extra
  : unknown;

type GetDispatch<ThunkApiConfig> = ThunkApiConfig extends {
  dispatch: infer Dispatch;
}
  ? FallbackIfUnknown<
      Dispatch,
      ThunkDispatch<
        GetState<ThunkApiConfig>,
        GetExtra<ThunkApiConfig>,
        AnyAction
      >
    >
  : ThunkDispatch<
      GetState<ThunkApiConfig>,
      GetExtra<ThunkApiConfig>,
      AnyAction
    >;

type GetRejectValue<ThunkApiConfig> = ThunkApiConfig extends {
  rejectValue: infer RejectValue;
}
  ? RejectValue
  : unknown;

type GetRejectedMeta<ThunkApiConfig> = ThunkApiConfig extends {
  rejectedMeta: infer RejectedMeta;
}
  ? RejectedMeta
  : unknown;

type GetFulfilledMeta<ThunkApiConfig> = ThunkApiConfig extends {
  fulfilledMeta: infer FulfilledMeta;
}
  ? FulfilledMeta
  : unknown;

export type GetThunkAPI<ThunkApiConfig> = BaseThunkAPI<
  GetState<ThunkApiConfig>,
  GetExtra<ThunkApiConfig>,
  GetDispatch<ThunkApiConfig>,
  GetRejectValue<ThunkApiConfig>,
  GetRejectedMeta<ThunkApiConfig>,
  GetFulfilledMeta<ThunkApiConfig>
>;
