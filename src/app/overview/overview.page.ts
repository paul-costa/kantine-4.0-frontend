import { Component, OnInit, OnDestroy, AfterViewChecked, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { GetMenuService } from '../get-menu.service';
import { Menu, Dish } from '../shared/menu.model';
import { Subscription } from 'rxjs';
import { SegmentChangeEventDetail } from '@ionic/core'


interface DishAndPrice {
  dish: Dish[];
  price: number[] | number;
}


@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit, OnDestroy {
  public workweek = ['mon', 'tue', 'wed', 'thu', 'fri'];
  public iconLocation: string[];

  public menu: Menu[];
  public today: number;
  public menuToday: DishAndPrice[];

  private menuServiceSub = new Subscription();


  constructor(
    private getMenuService: GetMenuService,
  ) {}


  ngOnInit(): void {
    this.iconLocation = this.getMenuService.iconLocation;

    this.menuServiceSub = this.getMenuService.getWholeMenu().subscribe(res => {
      this.menu = res.pdfdata;
      this.today = this.getMenuService.getWeekDay() - 1;
      this.menuToday = this.getMenuToday(this.today, this.menu);
    });
  }

  ngOnDestroy(): void {
    this.menuServiceSub.unsubscribe();
  }



  getMenuToday(day: number, menu: Menu[]) {
    const menToday = [];
    // get todays menu
    for (let [key, value] of Object.entries({...this.menu})) {
      if (value[day]) {
        menToday.push(value[day]);
      } else {
        menToday.push(value);
      }
    }
    return menToday;
  }

  onChangeDay(event: CustomEvent<SegmentChangeEventDetail>) {
    const selectedDay = +event.detail.value;
    this.menuToday = this.getMenuToday(selectedDay, this.menu);
  }
}
