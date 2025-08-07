export interface User {
  id: number;
  username: string;
}

export interface JwtPayload {
  username: string;
  sub: number;
  iat?: number;
  exp?: number;
}
