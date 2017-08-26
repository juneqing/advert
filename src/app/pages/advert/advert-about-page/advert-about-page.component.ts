import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/config.service';

@Component({
  selector: 'app-advert-about-page',
  templateUrl: './advert-about-page.component.html',
  styleUrls: ['./advert-about-page.component.css']
})
export class AdvertAboutPageComponent implements OnInit {
now=new Date();
  constructor() { }

  ngOnInit() {
  }

}
