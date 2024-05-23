const accessTokenKey = 'token';
const userKey = 'user';
const permissionsKey = 'permissions';

export class StorageService {
  static getAccessToken(): string | null {
    return localStorage.getItem(accessTokenKey);
  }

  static setAccessToken(token: string) {
    localStorage.setItem(accessTokenKey, token);
  }

  static getUser(): string | null {
    return localStorage.getItem(userKey);
  }

  static setUser(user: string) {
    localStorage.setItem(userKey, user);
  }

  static getPermissions(): string | null {
    return localStorage.getItem(permissionsKey);
  }

  static setPermissions(permissions: string) {
    localStorage.setItem(permissionsKey, permissions);
  }

  static setLoginData(token: string, user: string): void {
    StorageService.setAccessToken(token);
    StorageService.setUser(user);
  }

  static removeLoginData(): void {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(userKey);
    localStorage.removeItem(permissionsKey);
    localStorage.clear();
  }
}
