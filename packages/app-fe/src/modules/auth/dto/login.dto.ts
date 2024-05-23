import { AccountSchema } from '../../user/user.entity';

export type LoginDto = Pick<AccountSchema, 'email' | 'password'>;

export type LoginResponse = {
  token: string;
  user: AccountSchema;
};
