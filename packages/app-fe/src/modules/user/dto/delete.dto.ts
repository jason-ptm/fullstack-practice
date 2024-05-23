import { AccountSchema } from '../user.entity';

export type DeleteUserDto = Pick<AccountSchema, 'id'>;
