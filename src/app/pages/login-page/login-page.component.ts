import { Component, OnInit ,HostListener} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ConfigService } from '../../services/config.service';
import { Types } from '../../types';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  inputRandomCode:string='';
  advert: Types.Advert;
  warnPhone:boolean=false;
  warnImgAuthCode:boolean=false;
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
  step = 0;
  code;
  //用户输入的验证码
  authCode = '';
  codeTime = 0;
  constructor(public config: ConfigService) {
    // this.checkAdminLogin();
    this.checkAdvertLogin();
  }
@HostListener('keyup',['$event']) enter(event:KeyboardEvent){
  if(event.keyCode==13){
    this.login()
  }
}

  async login() {
      let result = await this.config.Post('/advert.login.go', this.user);
      if (result) {
        this.config.advert = result;
        this.config.router.navigateByUrl('/advert')
      } 
    
  }

  // checkAdminLogin() {
  //   if (this.config.admin) {
  //     this.config.router.navigateByUrl('/admin');
  //   }
  // }

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

  // 注册发送验证码
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
  // 判断登陆密码
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

  checkPhone(){
    this.warnPhone=!this.user.phone;
  }
  checkImgAuthCode(code:string){
    console.log(code,this.randomCode);
    this.warnImgAuthCode= !(code==this.randomCode);
  }
  randomCode;

  randomACode(){
    this.randomCode= Math.random().toString().substring(2,6)
  }
}
