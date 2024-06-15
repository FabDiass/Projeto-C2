import { Request, Response } from "express";
import UserDataBaseService from "../services/UserDataBaseService";
import { hashPassword } from "../utils/BcryptUtils"; // Importando a função hashPassword

class UserController {
  constructor() {}

  async listUsers(req: Request, res: Response) {
    try {
      const users = await UserDataBaseService.listDBUsers();
      res.json({
        status: "ok",
        users: users,
      });
    } catch (error: any) { // Anotando 'error' como 'any'
      console.error("Error listing users:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to list users",
      });
    }
  }

  async createUser(req: Request, res: Response) {
    const body = req.body;

    if (!body.email || !body.name || !body.password) {
      res.status(400).json({
        status: "error",
        message: "Missing parameters",
      });
      return;
    }

    try {
      const hashedPassword = await hashPassword(body.password); // Utilizando a função hashPassword

      const newUser = await UserDataBaseService.insertDBUser({
        name: body.name,
        email: body.email,
        password: hashedPassword,
      });

      res.json({
        status: "ok",
        newUser: newUser,
      });
    } catch (error: any) { // Anotando 'error' como 'any'
      console.error("Error creating user:", error);
      res.status(500).json({
        status: "error",
        message: error.message || "Failed to create user", // Utilizando error.message se disponível
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({
        status: "error",
        message: "Missing ID",
      });
      return;
    }

    const { name, email } = req.body;
    if (!email || !name) {
      res.status(400).json({
        status: "error",
        message: "Missing parameters",
      });
      return;
    }

    try {
      const updatedUser = await UserDataBaseService.updateDBUser(
        {
          name: name,
          email: email,
        },
        parseInt(id)
      );

      res.json({
        status: "ok",
        updatedUser: updatedUser,
      });
    } catch (error: any) { // Anotando 'error' como 'any'
      console.error("Error updating user:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to update user",
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({
        status: "error",
        message: "Missing ID",
      });
      return;
    }

    try {
      const response = await UserDataBaseService.deleteDBUser(parseInt(id));
      if (response) {
        res.json({
          status: "ok",
          message: "User deleted successfully",
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }
    } catch (error: any) { // Anotando 'error' como 'any'
      console.error("Error deleting user:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to delete user",
      });
    }
  }
}

export default new UserController();
