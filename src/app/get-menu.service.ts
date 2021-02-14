import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Menu } from './shared/menu.model';

import { environment } from './../environments/environment';
const BACKEND_URL = environment.apiUrl + '/parsepdf/';

@Injectable({
  providedIn: 'root'
})
export class GetMenuService {
  private _iconLocation: string[];

  constructor(
    private http: HttpClient,
  ) { }


  getWholeMenu() {
    return this.http.get<{message: string, pdfdata: Menu[]}>(BACKEND_URL)
      .pipe(
        map((pdfData) => {
          return pdfData;
        })
      );
  }


  getWeekDay(): number {
    return new Date().getDay();
  }


  getMenuEl(id: string) {
    const idObj = {
      foodIdent: id.split('-')[0],
      dayIdent: +id.split('-')[1],
    };
    
    return this.getWholeMenu().pipe(map(menuRes => {
      if (idObj.dayIdent<99) {
        return menuRes.pdfdata[idObj.foodIdent][idObj.dayIdent];
      } else {
        return menuRes.pdfdata[idObj.foodIdent]
      }
    }));
  }



  setIconLocation() {
    const iconNames = ['clearSoup', 'cremeSoup', 'salad', 'weekPizza',
      'dayPizza', 'menu1', 'menu2', 'wok', 'grill', 'dessert'];

    iconNames.forEach((el,i) => {
      iconNames[i] = '../assets/foodIcons/' + el + '.svg';
    });

    this._iconLocation = iconNames;
  }


  getSelectedDishGroup(dishGroupShortHandle: string) {
    switch (dishGroupShortHandle) {
      case 'clearSoup':
        return 'Clear Soup';

      case 'cremeSoup':
        return 'Creme Soup';

      case 'salad':
        return 'Salad Bar';

      case 'weekPizza':
        return 'Pizza of the Week';

      case 'dayPizza':
        return 'Pizza of the Day';

      case 'menu1':
        return 'Daily Menu 1 (vegetarian)';

      case 'menu2':
        return 'Daily Menu 2';

      case 'wok':
        return 'Wok';

      case 'grill':
        return 'Grill';

      case 'dessert':
        return 'Dessert';
    }
  }

  getAllergenes(allergensShortHandle: string[]) {
    allergensShortHandle.forEach((el, i) => {
      switch (el) {
        case 'A':
          allergensShortHandle[i] = 'Gluten';
          break;
        case 'B':
          allergensShortHandle[i] = 'Crustaceans';
          break;

        case 'C':
          allergensShortHandle[i] = 'Egg';
          break;

        case 'D':
          allergensShortHandle[i] = 'Fish';
          break;

        case 'E':
          allergensShortHandle[i] = 'Peanut';
          break;

        case 'F':
          allergensShortHandle[i] = 'Soy';
          break;

        case 'G':
          allergensShortHandle[i] = 'Milk';
          break;

        case 'H':
          allergensShortHandle[i] = 'Edible Nut';
          break;

        case 'L':
          allergensShortHandle[i] = 'Celeriac';
          break;

        case 'M':
          allergensShortHandle[i] = 'Mustard';
          break;

        case 'N':
          allergensShortHandle[i] = 'Sesame';
          break;

        case 'O':
          allergensShortHandle[i] = 'Sulfur Dioxide';
          break;

        case 'P':
          allergensShortHandle[i] = 'Lupine';
          break;

        default:
          break;
      }
    });

    return allergensShortHandle;
  }


  get iconLocation() {
    return [...this._iconLocation];
  }
}
