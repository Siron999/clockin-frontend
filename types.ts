export interface ApiResponse<T = unknown> {
  status: number;
  message?: string;
  data?: T;
  error?: string;
}

export interface User {
  id: Number;
  email: string;
  sub: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  locale?: string;
  hd?: string;
  profile?: string;
}

export interface DailyLog {
  id: number;
  task_id: number;
  clocked_in: string;
  clocked_out: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: number;
  user_id: number;
  title: string;
  allocated_time_per_day_hours: number;
  created_at: string;
  updated_at: string;
  daily_logs?: DailyLog[];
}

export interface LoginResponse {
  token: string;
  user: User;
}
