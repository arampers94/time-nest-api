import { prisma } from "../../helpers";
import {
  CreateTimeOffEventPayload,
  UpdateTimeOffEventPayload,
} from "../../payloads";

export class TimeOffEventsService {
  public getTimeOffEventById = async (timeOffEventId: number) => {
    const timeOffEvent = await prisma.timeOffEvent.findUnique({
      where: {
        id: timeOffEventId,
      },
    });
    return timeOffEvent;
  };

  public getCurrentTimeOffEventsByTeamId = async (teamId: number) => {
    const timeOffEvents = await prisma.timeOffEvent.findMany({
      where: {
        team_id: teamId,
        deleted_date: null,
        start_date: {
          lte: new Date(),
        },
        end_date: {
          gte: new Date(),
        },
      },
    });
    return timeOffEvents;
  };

  public getFutureTimeOffEventsByTeamId = async (teamId: number) => {
    const timeOffEvents = await prisma.timeOffEvent.findMany({
      where: {
        team_id: teamId,
        deleted_date: null,
        start_date: {
          gte: new Date(),
        },
      },
    });
    return timeOffEvents;
  };

  public createTimeOffEvent = async (payload: CreateTimeOffEventPayload) => {
    const timeOffEvent = await prisma.timeOffEvent.create({
      data: {
        title: payload.title,
        type: payload.type,
        description: payload.description,
        start_date: new Date(payload.start_date),
        end_date: new Date(payload.end_date),
        start_time: payload.start_time,
        end_time: payload.end_time,
        user_id: payload.user_id,
        team_id: payload.team_id,
      },
    });
    return timeOffEvent;
  };

  public updateTimeOffEvent = async (
    timeOffEventId: number,
    payload: UpdateTimeOffEventPayload
  ) => {
    const timeOffEvent = await prisma.timeOffEvent.update({
      where: {
        id: timeOffEventId,
      },
      data: {
        title: payload.title,
        type: payload.type,
        description: payload.description,
        start_date: payload.start_date
          ? new Date(payload.start_date)
          : undefined,
        end_date: payload.end_date ? new Date(payload.end_date) : undefined,
        start_time: payload.start_time,
        end_time: payload.end_time,
      },
    });
    return timeOffEvent;
  };

  public deleteTimeOffEvent = async (timeOffEventId: number) => {
    const timeOffEvent = await prisma.timeOffEvent.update({
      where: {
        id: timeOffEventId,
      },
      data: {
        deleted_date: new Date(),
      },
    });
    return timeOffEvent;
  };
}
