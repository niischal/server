import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogPost } from './schema/blogPost.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(BlogPost.name)
    private postModel: Model<BlogPost>,
  ) {}

  async findAll() {
    const posts = await this.postModel.find();
    return posts;
  }
  async findOne(id: ObjectId) {
    const post = await this.postModel.findById(id).exec();
    if (!post) {
      throw new Error(`Post with id ${id} not found`);
    }
    return post;
  }
  async create(post: CreatePostDto) {
    const res = await this.postModel.create(post);
    if (!res) {
      throw new Error('Could not Save');
    }
    return res;
  }
  async update(id: ObjectId, post: UpdatePostDto) {
    const updatedPost = await this.postModel.findOneAndUpdate(id, post);
    if (!updatedPost) {
      throw new NotFoundException();
    }
    return updatedPost;
  }
  async delete(id: ObjectId) {
    const res = await this.postModel.findOneAndDelete(id);
    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }
}
