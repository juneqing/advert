import 'rxjs/add/operator/toPromise';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RouterModule } from '@angular/router';
import { AdvertPageComponent } from './pages/advert/advert-page/advert-page.component';
import { AdvertHomePageComponent } from './pages/advert/advert-home-page/advert-home-page.component';
import { AdvertHeaderComponent } from './com/advert-header/advert-header.component';
import { AdvertSidebarComponent } from './com/advert-sidebar/advert-sidebar.component';
import { ConfigService } from './services/config.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AdvertPageComponent,
    AdvertHomePageComponent,
    AdvertHeaderComponent,
    AdvertSidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      {
        path: 'advert', component: AdvertPageComponent, children: [
          { path: '', component: AdvertHomePageComponent }
        ]
      }
    ]),
    FormsModule,
    HttpModule
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
