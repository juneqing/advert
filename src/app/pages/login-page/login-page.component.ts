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
  remeberMe:boolean=false;
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
    /**
     * 记住我事件,本地存储用户账户密码
     */
    let oldUserStr =localStorage.getItem('old-user')
    if(oldUserStr){
      this.user= JSON.parse(oldUserStr);
      this.remeberMe=true;
    }

  }
  /**
   * 清除记住我事件
   */
  clearSession(){
    if(!this.remeberMe){
      localStorage.setItem('old-user','');
    }
  }


  /**
   * enter键可直接登录
   * console.log(event.keyCode);//获取键盘码
   */
@HostListener('keyup',['$event']) enter(event:KeyboardEvent){
 if(event.keyCode==13){
    this.login()
  }  
}

 /**
  * 登录
  */
  async login() {
      let result = await this.config.Post('/advert.login.go', this.user);
      if (result) {
        // 本地存储登录
        if(this.remeberMe){localStorage.setItem('old-user',JSON.stringify(this.user));}else{}
      this.config.advert = result;
      this.config.router.navigateByUrl('/advert')
      } 
    
  }
  /**
 * 重定向,如果有该用户,直接定向到advert页面,防止用户直接网址内输入/advert而不是自动的/login
 */
  checkAdvertLogin() {
    if (this.config.advert) {
      this.config.router.navigateByUrl('/advert')
    }
  }


  // checkAdminLogin() {
  //   if (this.config.admin) {
  //     this.config.router.navigateByUrl('/admin');
  //   }
  // }

 
/**
 * 短信验证码循环60秒
 */
  loopOneMini() {
    this.codeTime = 60;
    let timmer = setInterval(() => {
      this.codeTime > 0 ? this.codeTime-- : clearInterval(timmer);
    }, 1000);
  }

  /**
   * 注册发送短信验证码
   */
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
  /**
   * 注册页面
   * 1.判断两次输入密码是否一致
   * 2.发送注册信息请求,存入至用户数据库,直接跳转到用户页面
   */
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
/**
 *警告
 */
  checkPhone(){
    this.warnPhone=!this.user.phone;
  }

  randomCode;
  /**
   *忘记密码版块时页面刷新数字验证码
   */
  checkImgAuthCode(code:string){
    //console.log(code,this.randomCode);
    this.warnImgAuthCode= !(code==this.randomCode);
  }
  /**
   * 刷新验证码
   */
  randomACode(){
    this.randomCode= Math.random().toString().substring(2,6)
  }
/**
 *忘记密码,进行密码修改
 */
async forgotPassword(){
  if(this.user.password != this.user.rePassword){
    alert('两次输入的密码不一致');
  }else{
    await this.config.Post('/advert.forgotPassword.go',{phone:this.user.phone,code:this.authCode,newPassword:this.user.password});
  }
}
}
