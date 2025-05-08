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
      include: {
        user: true,
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
      include: {
        user: true,
      },
    });
    return timeOffEvents;
  };

  public getCalendarTimeOffEventsByTeamId = async (
    teamId: number,
    month: number,
    year: string
  ) => {
    const givenDate = new Date(`${year}-${month.toString()}-01`);
    const firstDayOfPreviousMonth = new Date(givenDate);
    firstDayOfPreviousMonth.setMonth(givenDate.getMonth() - 1);
    firstDayOfPreviousMonth.setDate(1);

    const lastDayOfNextMonth = new Date(givenDate);
    lastDayOfNextMonth.setMonth(givenDate.getMonth() + 2);
    lastDayOfNextMonth.setDate(0);

    const timeOffEvents = await prisma.timeOffEvent.findMany({
      where: {
        team_id: teamId,
        deleted_date: null,
        start_date: {
          gte: firstDayOfPreviousMonth,
        },
        end_date: {
          lte: lastDayOfNextMonth,
        },
      },
      include: {
        user: true,
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
