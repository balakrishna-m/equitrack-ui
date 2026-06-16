import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, UrlTree } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { authGuard } from './authGuard';

describe('authGuard', () => {
  let authService: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('allows access when a token exists', () => {
    authService.login();

    const result = TestBed.runInInjectionContext(() => authGuard({} as never, {} as never));

    expect(result).toBe(true);
  });

  it('redirects to login when a token does not exist', () => {
    const router = TestBed.inject(Router);

    const result = TestBed.runInInjectionContext(() => authGuard({} as never, {} as never));

    expect(result).toBeInstanceOf(UrlTree);
    expect(router.serializeUrl(result as UrlTree)).toBe('/login');
  });
});
