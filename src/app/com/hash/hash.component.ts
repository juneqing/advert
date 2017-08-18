import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { Route, NavigationEnd } from '@angular/router';
import { Types } from '../../types/types';
@Component({
  selector: 'app-hash',
  templateUrl: './hash.component.html',
  styleUrls: ['./hash.component.css']
})
export class HashComponent implements OnInit {
  currentRoute: Route;
  currentSecondRoute: Route;
  showMessage = true;
  advert: Types.Advert;
  constructor(public config: ConfigService) {
    this.logRouter();
    this.config.route.queryParamMap.forEach(rtn => console.log(rtn));
    this.config.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.logRouter();

      }


    })
  }

  ngOnInit() {

  }

  logRouter() {
    let paths = location.pathname.split('/').filter(path => path !== '/' && path !== '');
    // console.log(paths);
    this.currentRoute = this.config.router.config.find(route => route.path === paths[0]);
    if (this.currentRoute && this.currentRoute.children) {
      console.log('寻找二级路由');
      this.currentSecondRoute =
        this.currentRoute.children.find(secondRoute => secondRoute.path === paths[1])
        || this.currentRoute.children.find(secondRoute => secondRoute.path === '');
      console.log(this.currentSecondRoute);
    }
  }

}
