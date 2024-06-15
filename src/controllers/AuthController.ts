import { Request, Response } from 'express';
import * as authService from '../services/AuthService';
import * as bcryptUtils from '../utils/BcryptUtils';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcryptUtils.hashPassword(password);
    const newUser = await authService.createUser({ email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authService.getUserByEmail(email);
    if (user && await bcryptUtils.comparePassword(password, user.password)) {
      // Generate token or session
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
