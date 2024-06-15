import { Request, Response } from 'express';
import * as commentService from '../services/CommentService';

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await commentService.getAllComments();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const comment = await commentService.getCommentById(Number(req.params.id));
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const { content, postId, userId } = req.body;
    const newComment = await commentService.createComment({ content, postId, userId });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
