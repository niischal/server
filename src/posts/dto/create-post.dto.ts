export class CreatePostDto {
  readonly title: string;
  readonly slug: string;
  readonly content: string;
  readonly isActive: boolean;
  readonly featuredImage: string;
  readonly userId: string;
}
