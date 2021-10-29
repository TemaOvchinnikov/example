import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: {
        images: {
          select: {
            id: true,
            imagePuth: true,
          },
        },
        likes: {
          take: 5,
          select: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            likes: true,
            images: true,
            share: true,
            comments: true,
          },
        },
      },
      /*
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
      */
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
