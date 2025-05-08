import { NextFunction, Request, Response } from "express";
import { TimeOffEventsService } from "./time-off-events.service";
import {
  CreateTimeOffEventPayload,
  UpdateTimeOffEventPayload,
} from "../../payloads";

const timeOffEventsService = new TimeOffEventsService();

export const getTimeOffEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const timeOffEvent = await timeOffEventsService.getTimeOffEventById(
      parseInt(id as string, 10)
    );
    if (!timeOffEvent) {
      res.status(404).json({ message: "Time off event not found" });
      return;
    }
    res.status(200).json(timeOffEvent);
  } catch (error) {
    res.status(400).json({ message: "Error fetching time off event" });
    next(error);
  }
};

export const getCurrentTimeOffEventsByTeamId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { teamId } = req.params;
    const timeOffEvents =
      await timeOffEventsService.getCurrentTimeOffEventsByTeamId(
        parseInt(teamId as string, 10)
      );
    res.status(200).json(timeOffEvents);
  } catch (error) {
    res.status(400).json({ message: "Error fetching current time off events" });
    next(error);
  }
};

export const getFutureTimeOffEventsByTeamId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { teamId } = req.params;
    const timeOffEvents =
      await timeOffEventsService.getFutureTimeOffEventsByTeamId(
        parseInt(teamId as string, 10)
      );
    res.status(200).json(timeOffEvents);
  } catch (error) {
    res.status(400).json({ message: "Error fetching future time off events" });
    next(error);
  }
};

export const getCalendarTimeOffEventsByTeamId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { teamId } = req.params;
    const { month, year } = req.body;
    const timeOffEvents =
      await timeOffEventsService.getCalendarTimeOffEventsByTeamId(
        parseInt(teamId as string, 10),
        month as string,
        year as string
      );
    res.status(200).json(timeOffEvents);
  } catch (error) {
    res.status(400).json({ message: "Error fetching time off events" });
    next(error);
  }
};

export const createTimeOffEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const payload = req.body as CreateTimeOffEventPayload;
    await timeOffEventsService.createTimeOffEvent(payload);
    res.status(201).json({ message: "Time off event created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error creating time off event" });
    next(error);
  }
};

export const updateTimeOffEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const payload = req.body as UpdateTimeOffEventPayload;
    await timeOffEventsService.updateTimeOffEvent(
      parseInt(id as string, 10),
      payload
    );
    res.status(200).json({ message: "Time off event updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error updating time off event" });
    next(error);
  }
};

export const deleteTimeOffEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await timeOffEventsService.deleteTimeOffEvent(parseInt(id as string, 10));
    res.status(200).json({ message: "Time off event deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting time off event" });
    next(error);
  }
};
