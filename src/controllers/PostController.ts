import { Request, Response } from 'express';
import * as postService from '../services/PostService';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await postService.getPostById(Number(req.params.id));
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, authorId } = req.body;
    const newPost = await postService.createPost({ title, content, authorId });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
