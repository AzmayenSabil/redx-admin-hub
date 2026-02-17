export interface Role {
  name: string;
}

export interface User {
  phone: string;
  roles: Role[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface LoginPayload {
  phone: string;
  otp: string;
}

export interface OtpRequest {
  phone: string;
}
