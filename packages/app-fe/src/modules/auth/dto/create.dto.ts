import { AccountSchema, UserSchema } from '../../user/user.entity';

export type RegisterUserDto = Omit<UserSchema, 'id'>;

export type RegisterAccountDto = Partial<
  Omit<AccountSchema, 'id' | 'updatedAt' | 'createdAt' | 'user'>
> & { user: RegisterUserDto };
