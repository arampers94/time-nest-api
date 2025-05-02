import { prisma } from "../../helpers";
import { CreateTeamPayload } from "../../payloads/create-team.interface";
import { UpdateTeamDetailsPayload } from "../../payloads/update-team-details.interface";

export class TeamsService {
  public getTeamsByOrganizationId = async (organizationId: number) => {
    const teams = await prisma.team.findMany({
      where: {
        organizationId: organizationId,
      },
    });
    return teams;
  };

  public getTeamById = async (teamId: number) => {
    const team = await prisma.team.findUnique({
      where: {
        id: teamId,
        deleted_date: null,
      },
      include: {
        users: true,
      },
    });
    return team;
  };

  public getTeamsByUserId = async (userId: number) => {
    const teams = await prisma.team.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
        deleted_date: null,
      },
    });
    return teams;
  };

  public createTeam = async (payload: CreateTeamPayload) => {
    const team = await prisma.team.create({
      data: {
        name: payload.name,
        description: payload.description,
        organizationId: payload.organizationId,
        users: {
          connect: payload.user_ids.map((id) => ({ id })),
        },
      },
    });
    return team;
  };

  public updateTeamDetails = async (
    teamId: number,
    payload: UpdateTeamDetailsPayload
  ) => {
    const team = await prisma.team.update({
      where: {
        id: teamId,
      },
      data: {
        name: payload.name,
        description: payload.description,
      },
    });
    return team;
  };

  public addTeamUsers = async (teamId: number, userIds: number[]) => {
    const team = await prisma.team.update({
      where: {
        id: teamId,
      },
      data: {
        users: {
          connect: userIds.map((id) => ({ id })),
        },
      },
    });
    return team;
  };

  public removeTeamUsers = async (teamId: number, userIds: number[]) => {
    const team = await prisma.team.update({
      where: {
        id: teamId,
      },
      data: {
        users: {
          disconnect: userIds.map((id) => ({ id })),
        },
      },
    });
    return team;
  };

  public deleteTeam = async (teamId: number) => {
    const team = await prisma.team.update({
      where: {
        id: teamId,
      },
      data: {
        deleted_date: new Date(),
      },
    });
    return team;
  };
}
