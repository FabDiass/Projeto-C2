import prisma from '../models/prismaClient';

export const getAllPosts = async () => {
  return await prisma.post.findMany();
};

export const getPostById = async (id: number) => {
  return await prisma.post.findUnique({
    where: { id }
  });
};

export const createPost = async (data: { title: string; content?: string; authorId: number }) => {
  return await prisma.post.create({
    data
  });
};
