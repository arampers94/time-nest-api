export interface CreateTeamPayload {
  name: string;
  description?: string;
  organizationId: number;
  user_ids: number[];
}
