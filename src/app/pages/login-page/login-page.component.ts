import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  checked = false;
  indeterminate = false;
  align = 'start';
  disabled = false;
  state = 'login';
  user = {
    phone: '',
    password: '',
    rePassword: ''
  };
  code;
  //用户输入的验证码
  authCode = '';
  codeTime = 0;
  constructor(public config: ConfigService) {
    this.checkAdminLogin();
    this.checkAdvertLogin();
  }

  async login() {
    if (this.user.phone == 'moon' && this.user.password == 'moon') {
      this.config.admin = { username: 'moon', password: 'moon' };
      this.config.router.navigateByUrl('/admin')
    } else {
      let result = await this.config.Post('/advert.login.go', this.user);
      if (result) {
        this.config.advert = result;
        this.config.router.navigateByUrl('/advert')
      } else {
        alert('用户名或密码不存在');
      }
    }
  }

  checkAdminLogin() {
    if (this.config.admin) {
      this.config.router.navigateByUrl('/admin');
    }
  }
  checkAdvertLogin() {
    if (this.config.advert) {
      this.config.router.navigateByUrl('/advert')
    }
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
  ngOnInit() {

  }
  async register() {
    if (this.user.password != this.user.rePassword) {
      alert('两次输入的密码不一致');
    } else {
      let advert = await this.config.Post('/advert.register.go', { user: this.user, code: this.authCode });
      if (advert) {
        this.config.advert = advert;
        this.config.router.navigateByUrl('/advert');
      }
    }

  }
}
