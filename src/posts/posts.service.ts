import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: {
        user: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
        images: {
          select: {
            id: true,
            puth: true,
          },
        },
        _count: {
          select: {
            comments: true,
            shares: true,
            likes: true,
          },
        },
      },

      /*
      include: {
        users: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          },
        },
      },
      */
    });
  }
}
