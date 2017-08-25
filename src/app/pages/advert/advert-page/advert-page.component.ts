import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../../../services/config.service';
@Component({
  selector: 'app-advert-page',
  templateUrl: './advert-page.component.html',
  styleUrls: ['./advert-page.component.css']
})
export class AdvertPageComponent implements OnInit {

  constructor(public config:ConfigService) { 
    // 登录拦截,如果没有广告商就重定向到登录页面
      if(!this.config.advert ){
        this.config.router.navigateByUrl('/login');
      }
  }

  ngOnInit() {
  }

}
