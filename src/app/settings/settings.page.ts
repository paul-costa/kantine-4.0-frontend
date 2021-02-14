import { Component, OnInit, Renderer2 } from '@angular/core';
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
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
  }


  onChangeDarkmode(event: CustomEvent) {
    this.darkmode = event.detail.checked;

    // set darkmode
    // this.renderer.setAttribute(document.body, 'color-theme', 'dark');

    this.settingsService.storeSettings(this.darkmode);
  }
}
