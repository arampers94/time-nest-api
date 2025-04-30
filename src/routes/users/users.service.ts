import { prisma } from "../../helpers";

export class UsersService {
  public getUsersByOrganizationId = async (organizationId: number) => {
    const users = await prisma.user.findMany({
      where: {
        organizationid: organizationId,
      },
    });
    return users;
  };

  public getUserById = async (userId: number) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  };
}
