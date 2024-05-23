export type AccountSchema = {
  id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  user: UserSchema;
};

export type UserSchema = {
  id: string;
  age: number;
  fullName: string;
};
