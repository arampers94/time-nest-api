import { NextFunction, Request, Response } from "express";
import { TeamsService } from "./teams.service";
import { CreateTeamPayload, UpdateTeamDetailsPayload } from "../../payloads";

const teamsService = new TeamsService();

export const getTeamsByOrganizationId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId } = req.params;
    const teams = await teamsService.getTeamsByOrganizationId(
      parseInt(organizationId as string, 10)
    );
    res.status(200).json(teams);
  } catch (error) {
    res.status(400).json({ message: "Error fetching teams" });
    next(error);
  }
};

export const getTeamById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const team = await teamsService.getTeamById(parseInt(id as string, 10));
    if (!team) {
      res.status(404).json({ message: "Team not found" });
      return;
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ message: "Error fetching team" });
    next(error);
  }
};

export const createTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const payload = req.body as CreateTeamPayload;
    await teamsService.createTeam(payload);
    res.status(201).json({ message: "Team created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error creating team" });
    next(error);
  }
};

export const updateTeamDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const payload = req.body as UpdateTeamDetailsPayload;
    await teamsService.updateTeamDetails(parseInt(id as string, 10), payload);
    res.status(200).json({ message: "Team updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error updating team" });
    next(error);
  }
};

export const addTeamUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userIds = req.body.user_ids as number[];
    const team = await teamsService.addTeamUsers(
      parseInt(id as string, 10),
      userIds
    );
    if (!team) {
      res.status(404).json({ message: "Team not found" });
      return;
    }
    res.status(200).json({ message: "Users added to team successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error adding users to team" });
    next(error);
  }
};

export const removeTeamUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userIds = req.body.user_ids as number[];
    const team = await teamsService.removeTeamUsers(
      parseInt(id as string, 10),
      userIds
    );
    if (!team) {
      res.status(404).json({ message: "Team not found" });
      return;
    }
    res.status(200).json({ message: "Users removed from team successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error removing users from team" });
    next(error);
  }
};

export const deleteTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await teamsService.deleteTeam(parseInt(id as string, 10));
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting team" });
    next(error);
  }
};
