import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BlogPost } from 'src/posts/schema/blogPost.schema';
import { PostsService } from './posts.service';
import { ObjectId } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ObjectIdPipe } from 'src/helper/pipes/objectId.pipe';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      return await this.postsService.findAll();
    } catch (err) {
      throw new Error();
    }
  }
  @Get(':id')
  async getOnePost(@Param('id', ObjectIdPipe) id: ObjectId): Promise<BlogPost> {
    try {
      return await this.postsService.findOne(id);
    } catch (err) {
      console.error('Error getting post:', err);
      throw new NotFoundException();
    }
  }
  @Post()
  async addPost(@Body() post: CreatePostDto) {
    try {
      return await this.postsService.create(post);
    } catch (err) {
      throw err;
    }
  }
  @Put(':id')
  async editPost(
    @Param('id', ObjectIdPipe) id: ObjectId,
    @Body() post: UpdatePostDto,
  ) {
    try {
      return await this.postsService.update(id, post);
    } catch (err) {
      throw err;
    }
  }
  @Delete(':id')
  async removePost(@Param('id', ObjectIdPipe) id: ObjectId) {
    try {
      return await this.postsService.delete(id);
    } catch (err) {
      throw err;
    }
  }
}
