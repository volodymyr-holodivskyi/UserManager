import { User } from './user';

export class loginData {
  user: User;
  token: string;
  refreshToken: string;
  constructor(userData: User, token: string, refreshToken: string) {
    this.user = new User(
      userData.name,
      userData.email,
      userData.password,
      userData.created_at,
      userData.updated_at,
      userData.id,
      userData.entitlements
    );
    this.token = token;
    this.refreshToken = refreshToken;
  }
}
