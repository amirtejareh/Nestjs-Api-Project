export interface JwtPayload {
  sub: number;
  username: string;
  password: string;
  roles: string[];
  iat?: number;
  exp?: number;
}
