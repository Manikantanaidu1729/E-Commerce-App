import { ActivatedRouteSnapshot, CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { UserService } from './users/user-service.service';
import { map } from 'rxjs';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (next: ActivatedRouteSnapshot) => {
  return inject(UserService).isUserAuthenticated$.pipe(
    map((isAuthenticated) => isAuthenticated ? true : createUrlTreeFromSnapshot(next, ['/', 'home', 'login']))
  );
};