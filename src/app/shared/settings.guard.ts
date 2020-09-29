import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SettingsService } from './settings.service';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsGuard implements CanLoad {
  
  constructor(
    private settingsService: SettingsService,
    private router: Router,
  ) {}
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    return this.settingsService.settingsExist.pipe(
      settingsExist => {
        if(settingsExist) {
          return this.settingsService.loadSettingsData();
        } else {
          return of(settingsExist);
        }
      },

      tap(settings => {
        this.router.navigateByUrl('/overview');
      })
    );
  }
}
