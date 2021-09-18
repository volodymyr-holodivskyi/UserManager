import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

export class UserDetailsGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (route.params.id === localStorage.getItem('userId')) return true;
    let entitlements = localStorage.getItem('entitlements')?.split(',');
    if (entitlements?.includes('can_view_details')) return true;
    else throw new Error('No access');
  }
}
