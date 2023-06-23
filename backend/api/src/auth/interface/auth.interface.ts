import { ROLES } from 'backend/database/src/constants/interfaces.entities';

export interface IPayloadToken {
  id: string;
  role: ROLES[];
}

export interface IAuthInput {
  username: string;
  email: string;
  password: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IAuthTokenResult {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface IUseToken {
  role: string;
  sub: string;
  isExpired: boolean;
}
