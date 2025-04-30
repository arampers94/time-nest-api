import { NextFunction, Request, Response } from "express";
import { UsersService } from "./users.service";

const usersService = new UsersService();

export const getUsersByOrganizationId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId } = req.query;
    const users = await usersService.getUsersByOrganizationId(
      parseInt(organizationId as string, 10)
    );
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.query;
    const user = await usersService.getUserById(parseInt(id as string, 10));
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
