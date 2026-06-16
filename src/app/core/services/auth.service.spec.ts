import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('stores a token after login', () => {
    service.login();

    expect(localStorage.getItem('token')).toBeTruthy();
    expect(service.isAuthenticated()).toBe(true);
  });

  it('removes the token after logout', () => {
    service.login();

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(service.isAuthenticated()).toBe(false);
  });
});
