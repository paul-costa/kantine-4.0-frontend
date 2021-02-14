import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.page.html',
  styleUrls: ['./downloads.page.scss'],
})
export class DownloadsPage implements OnInit {

  public appDownloads = [];

  constructor(
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.appDownloads = [
      {
        disabled: false,
        os: 'android',
        svg: '../../assets/downloads/android.svg',
        link: 'https://drive.google.com/file/d/1sv5MpCyqQ1SwqNe-mKPUIw1uvzIoomAJ',
        updated: new Date(2021, 1, 14),
        label: 'click to download APK / redirect to PlayStore'
      },
      {
        disabled: false,
        os: 'github',
        svg: '../../assets/downloads/github.svg',
        link: 'https://github.com/paul-costa/kantine-4.0-frontend',
        updated: new Date(2021, 1, 14),
        label: 'click to redirect to GitHub Repo'
      },
      {
        disabled: true,
        os: 'apple',
        svg: '../../assets/downloads/apple.svg',
        link: null,
        updated: null,
        label: 'click to redirect to AppStore'
      }
    ]
  }

  public onOpenDownloadLink(appObj) {
    this.sharedService.openLink(appObj);
  }


}
