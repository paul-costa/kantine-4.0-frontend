import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetMenuService } from 'src/app/get-menu.service';
import { MenuEl } from 'src/app/shared/menu.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy {
  private paramSub = new Subscription();
  public selectedDish: MenuEl;
  public priceType: string;

  public iconSrc: string;
  public selectedDishGroup: string;

  public allergensName: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private getMenuService: GetMenuService,
  ) { }



  ngOnInit() {
    this.paramSub = this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('id')) {
        this.router.navigateByUrl('/overview');
        return;
      }

      const id = paramMap.get('id');

      this.iconSrc = '../../../assets/foodIcons/' + id.split('-')[0] + '.svg';
      this.selectedDishGroup = this.getMenuService.getSelectedDishGroup(id.split('-')[0]);

      this.getMenuService.getMenuEl(id).subscribe(selDish => {
        this.selectedDish = selDish;
        this.priceType = typeof(this.selectedDish.price);

        if(this.selectedDish.dish.allergens) {
          this.allergensName = [];
          const allergensShort = [...this.selectedDish.dish.allergens];
          const allergensLong = this.getMenuService.getAllergenes([...this.selectedDish.dish.allergens]);

          for(let i=0; i<allergensShort.length; i++) {
            this.allergensName.push(allergensShort[i] + ' - ' + allergensLong[i]);
          }
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
  }
}
