import { prisma } from "../../helpers";
import {
  CreateOrganizationPayload,
  UpdateOrganizationPayload,
} from "../../payloads";

export class OrganizationsService {
  public getOrganizationById = async (organizationId: number) => {
    const organization = await prisma.organization.findUnique({
      where: {
        id: organizationId,
      },
    });
    return organization;
  };

  public getOrganizations = async () => {
    const organizations = await prisma.organization.findMany();
    return organizations;
  };

  public createOrganization = async (payload: CreateOrganizationPayload) => {
    const organization = await prisma.organization.create({
      data: {
        name: payload.name,
        email_domain: payload.email_domain,
      },
    });
    return organization;
  };

  public updateOrganization = async (
    organizationId: number,
    payload: UpdateOrganizationPayload
  ) => {
    const organization = await prisma.organization.update({
      where: {
        id: organizationId,
      },
      data: {
        name: payload.name,
        email_domain: payload.email_domain,
      },
    });
    return organization;
  };

  public deleteOrganization = async (organizationId: number) => {
    const organization = await prisma.organization.update({
      where: {
        id: organizationId,
      },
      data: {
        deleted_date: new Date(),
      },
    });
    return organization;
  };
}
