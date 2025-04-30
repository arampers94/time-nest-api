export interface CreateTimeOffEventPayload {
  title: string;
  type?: string;
  description?: string;
  start_date: Date;
  end_date: Date;
  start_time?: string;
  end_time?: string;
  user_id: number;
  team_id: number;
}

export interface UpdateTimeOffEventPayload {
  title?: string;
  type?: string;
  description?: string;
  start_date?: Date;
  end_date?: Date;
  start_time?: string;
  end_time?: string;
}
