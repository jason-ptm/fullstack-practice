import { handleAxiosError } from '../../helpers/axios.helper';
import { ProtectedService } from '../../services/ProtectedService';
import { PaginatedResultInterface } from '../../types/PaginatedResultInterface';
import { ApiResponse } from '../../types/api-response';
import { CreatePostDto } from './dto/create.dto';
import { ListPostDto } from './dto/list.dto';
import { UpdatePostDto } from './dto/update.dto';
import { InteractionSchema, PostSchema } from './post.entity';

const baseUrl = 'posts';

export class PostService extends ProtectedService {
  async findAll(
    dto: ListPostDto
  ): Promise<ApiResponse<PaginatedResultInterface<PostSchema>>> {
    try {
      const response = await this.axios.get(
        `/${baseUrl}/${dto.mine ? 'my-posts' : ''}`,
        {
          params: dto.pagination,
        }
      );

      return {
        statusCode: response.status,
        result: response.data,
      };
    } catch (error) {
      return handleAxiosError(error);
    }
  }

  async create(dto: CreatePostDto): Promise<ApiResponse<PostSchema>> {
    try {
      const response = await this.axios.post(`/${baseUrl}`, dto);

      return {
        statusCode: response.status,
        result: response.data,
      };
    } catch (error) {
      return handleAxiosError(error);
    }
  }

  async update(id: string, dto: UpdatePostDto): Promise<PostSchema> {
    const response = await this.axios.patch(`/${baseUrl}/${id}`, dto);

    return response.data;
  }

  async delete(id: string): Promise<ApiResponse<PostSchema>> {
    try {
      const response = await this.axios.delete(`/${baseUrl}/${id}`);

      return {
        statusCode: response.status,
        result: response.data.id,
      };
    } catch (error) {
      return handleAxiosError(error);
    }
  }

  async giveLike(postId: string): Promise<ApiResponse<InteractionSchema>> {
    try {
      const response = await this.axios.post(`/${baseUrl}/${postId}/interact`);
      if (response.data?.userId)
        return {
          statusCode: response.status,
          result: { liked: true, data: response.data, postId },
        };
      return {
        statusCode: response.status,
        result: { liked: false, data: response.data, postId },
      };
    } catch (error) {
      return handleAxiosError(error);
    }
  }
}
