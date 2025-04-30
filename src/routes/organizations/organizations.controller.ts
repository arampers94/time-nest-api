import { NextFunction, Request, Response } from "express";
import { OrganizationsService } from "./organizations.service";

const organizationsService = new OrganizationsService();

export const getOrganizations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const organizations = await organizationsService.getOrganizations();
    res.status(200).json(organizations);
  } catch (error) {
    next(error);
  }
};

export const getOrganizationById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const organization = await organizationsService.getOrganizationById(
      parseInt(id as string, 10)
    );
    if (!organization) {
      res.status(404).json({ message: "Organization not found" });
      return;
    }
    res.status(200).json(organization);
  } catch (error) {
    next(error);
  }
};

export const createOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const payload = req.body;
    await organizationsService.createOrganization(payload);
    res.status(201).json({ message: "Organization created successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const payload = req.body;
    await organizationsService.updateOrganization(
      parseInt(id as string, 10),
      payload
    );
    res.status(200).json({ message: "Organization updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await organizationsService.deleteOrganization(parseInt(id as string, 10));
    res.status(200).json({ message: "Organization deleted successfully" });
  } catch (error) {
    next(error);
  }
};
