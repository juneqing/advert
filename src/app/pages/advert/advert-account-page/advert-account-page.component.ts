import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ConfigService } from '../../../services/config.service';
import { Types } from '../../../types';

@Component({
  selector: 'app-advert-account-page',
  templateUrl: './advert-account-page.component.html',
  styleUrls: ['./advert-account-page.component.css']
})
export class AdvertAccountPageComponent implements OnInit {
  step = 0;
  constructor(public config: ConfigService, ) { }

  ngOnInit() {
  }

}
