import { Injectable } from '@angular/core';
import { from, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';



export class Settings {
  darkmode: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _settings  = new BehaviorSubject<Settings>(null)
  constructor( ) { }


  public loadSettingsData() {
    return from(Plugins.Storage.get({key: 'settings'})).pipe(
      map(storedData => {
        if(!storedData || !storedData.value) {
          return null;
        }

        const parsedData = JSON.parse(storedData.value) as {darkmode: boolean;};
        const settings = {
          darkmode: parsedData.darkmode,
        };

        return settings;
      })
    );
  }


  public storeSettings(darkmode: boolean) {
    // store information
    const data = {
      darkmode: darkmode,
    };
  }


  get settingsExist(): any {
    return this._settings.asObservable().pipe(map(settings => {
      if (settings) { // if settings are locally stored already
        return true;
      } else {
        return false;
      }
    }));
  }
}
