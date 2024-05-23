import { UserSchema } from '../user';
import { RegisterUserApiDto, RegisterUserDto } from './dto/create.dto';

export const transformUserFromApi = (user: any): UserSchema => ({
  id: user.id,
  fullName: user.full_name,
  age: user.age,
  email: user.email,
  password: user.password,
  createdAt: user.created_at,
  updatedAt: user.updated_at,
});

export const transformUser = (user: RegisterUserDto): RegisterUserApiDto => ({
  full_name: user.fullName,
  age: user.age,
  email: user.email,
  password: user.password,
});
