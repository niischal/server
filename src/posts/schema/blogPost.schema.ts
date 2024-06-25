import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogPostDocument = HydratedDocument<BlogPost>;

@Schema()
export class BlogPost {
  @Prop()
  title: string;
  @Prop()
  slug: string;
  @Prop()
  content: string;
  @Prop()
  isActive: boolean;
  @Prop()
  featuredImage: string;
  @Prop()
  userId: string;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
