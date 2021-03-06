import { Component, OnInit, OnDestroy, AfterViewChecked, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { GetMenuService } from '../get-menu.service';
import { Menu, Dish } from '../shared/menu.model';
import { Subscription } from 'rxjs';
import { SegmentChangeEventDetail } from '@ionic/core'


interface DishAndPrice {
  id: string;
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

  public pageLoading = false;

  private menuServiceSub = new Subscription();


  constructor(
    private getMenuService: GetMenuService,
  ) {}


  ngOnInit(): void {
    this.iconLocation = this.getMenuService.iconLocation;
    this.pageLoading = true;

    this.menuServiceSub = this.getMenuService.getWholeMenu().subscribe(res => {
      this.menu = res.pdfdata;
      this.today = ((this.getMenuService.getWeekDay() - 1) === 5 || (this.getMenuService.getWeekDay() - 1) === 0) ? (this.getMenuService.getWeekDay() - 1) : 4; // weekend exception jumps to friday last week 
      this.menuToday = this.getMenuToday(this.today, this.menu);
      this.pageLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.menuServiceSub.unsubscribe();
  }



  getMenuToday(day: number, menu: Menu[]) {
    const menToday = [];
    // get todays menu
    for (let [key, value] of Object.entries(menu)) {
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
