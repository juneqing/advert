import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-advert-sidebar',
  templateUrl: './advert-sidebar.component.html',
  styleUrls: ['./advert-sidebar.component.css']
})
export class AdvertSidebarComponent implements OnInit {
  advertRoute: Route;
  constructor(public config: ConfigService) {
    this.getAdvertRoute();
  }

  ngOnInit() {
  }

  getAdvertRoute() {
    this.advertRoute = this.config.router.config.find(route => route.path === 'advert');
    // this.advertRoute.
  }

}
