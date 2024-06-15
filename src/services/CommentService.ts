import prisma from '../models/prismaClient';

export const getAllComments = async () => {
  return await prisma.comment.findMany();
};

export const getCommentById = async (id: number) => {
  return await prisma.comment.findUnique({
    where: { id }
  });
};

export const createComment = async (data: { content: string; postId: number; userId: number }) => {
  return await prisma.comment.create({
    data
  });
};
