import { Component, OnInit } from '@angular/core';
import { Plugins } from 'protractor/built/plugins';
import { SettingsService } from '../shared/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public darkmode = true;

  constructor(
    private settingsService: SettingsService,
  ) { }

  ngOnInit() {
  }


  onChangeDarkmode(event: CustomEvent) {
    this.settingsService.storeSettings(this.darkmode);
  }
}
