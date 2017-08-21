import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ConfigService } from '../../../services/config.service';
import { Types } from '../../../types';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-advert-account-page',
  templateUrl: './advert-account-page.component.html',
  styleUrls: ['./advert-account-page.component.css']
})
export class AdvertAccountPageComponent implements OnInit {
  user = {
    phone: '',
    password: '',
    rePassword: ''
  };
  step = 0;
  statu = " ";
  //用户输入的验证码
  code;
  authCode = '';
  codeTime = 0;
  advert: Types.Advert;
  constructor(public config: ConfigService, public dialog: MdDialog) {
    this.advert = this.config.advert;
  }
  openDialog() {
    this.dialog.open(DialogOverviewExampleDialog);
  }
  ngOnInit() {
  }
  /**
     * 循环60秒
     */
  loopOneMini() {
    this.codeTime = 60;
    let timmer = setInterval(() => {
      this.codeTime > 0 ? this.codeTime-- : clearInterval(timmer);
    }, 1000);
  }
  async sendAuthCode() {

    if (this.codeTime > 0) {
    } else {
      if (/1[0-9]\d{9}/g.test(this.user.phone)) {
        this.loopOneMini();
        this.code = await this.config.Post('/advert.authCode.go', { phone: this.user.phone });
      } else {
        alert('手机号不正确');
      }
    }
  }
  async changePhone() { }
  async changePass() { }
  async setEamil() { }
}



@Component({
  selector: 'app-over-dialog',
  template: `<h1>dsa</h1>`
})
export class DialogOverviewExampleDialog implements OnInit {
  ngOnInit() {
  }

}