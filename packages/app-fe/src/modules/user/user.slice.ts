import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserService } from '.';
import { UpdateUserDto } from './dto/update.dto';

const sliceName = 'user';

export const updateAction = createAsyncThunk(
  `${sliceName}/updateAction`,
  async (input: UpdateUserDto) => {
    const service = new UserService();

    return service.update(input);
  }
);
