import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    public alertController: AlertController,
    private router: Router,
  ) { }



  openLink(appObj) {
    this.alertController.create({
      header: 'Redirect',
      subHeader: `to ${appObj.label.split(' ').reverse()[0]}`,
      message: 'redirect will open in a new window',
      buttons: 
        [{
          text: 'OK',
          handler: () => { setTimeout(() => { window.open(appObj.link, '_system'); }, 500)}
        },
        {
          text: 'cancel',
          handler: () => {  }
        }],
    }).then(res => {
      res.present();
    });
  }
  
}
