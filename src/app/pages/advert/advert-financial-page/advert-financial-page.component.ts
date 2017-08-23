import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ConfigService } from '../../../services/config.service';
import { Types } from '../../../types';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-advert-financial-page',
  templateUrl: './advert-financial-page.component.html',
  styleUrls: ['./advert-financial-page.component.css']
})
export class AdvertFinancialPageComponent implements OnInit {
  step = 0;
  advert: Types.Advert;
  constructor(public config: ConfigService) {
    this.advert=this.config.advert;
   }

  ngOnInit() {
  }

}
