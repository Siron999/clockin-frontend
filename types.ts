export interface ApiResponse<T = unknown> {
  status: number;
  message?: string;
  data?: T;
  error?: string;
}

export interface User {
  _id: string;
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

export interface LoginResponse {
  token: string;
  user: User;
}
