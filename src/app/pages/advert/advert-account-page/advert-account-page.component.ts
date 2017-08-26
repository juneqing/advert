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
  warnTruename:boolean=false;
  warnCertificateNum:boolean=false;
  warnEmail:boolean=false;
  warnAdress:boolean=false;
  warnCompanyname:boolean=false;
  warnCompanynum:boolean=false;
  warnHeadname:boolean=false;
  warnHeadphone:boolean=false;
  warnHeadEmail:boolean=false;
  user = {
    phone: '',
    password: '',
    rePassword: ''
  };
  step = 0;
  statu = " ";
  status="IDcard";
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
      if (/1[0-9]\d{9}/g.test(this.advert.phone)) {
        this.loopOneMini();
        this.code = await this.config.Post('/advert.authCode.go', { phone: this.advert.phone });
      } else {
        alert('手机号不正确');
      }
    }
  }
  /**
 *忘记密码,进行密码修改
 */
async changePassword(){
  if(this.advert.newPassword!= this.advert.reNewPassword){
    alert('两次输入的密码不一致');
  }else{
    await this.config.Post('/advert.changePassword.go',{phone:this.advert.phone,oldPassword:this.advert.oldPassword,newPassword:this.advert.newPassword});
  }
}
  async changePhone() { }
  async changePass() { }
  async setEamil() { }
  // 判断是否真实姓名为空
  checkTruename(){
        this.warnTruename=!this.advert.truename;
  }
  checkCertificateNum(){
    this.warnCertificateNum=!this.advert.CertificateNum;
}
checkEmail(){
  this.warnEmail=!this.advert.email;
}
checkAdress(){
  this.warnAdress=!this.advert.adress;
}
checkCompanyname(){
  this.warnCompanyname=!this.advert.companyname;
}
checkCompanynum(){
  this.warnCompanynum=!this.advert.companynum;
}
checkHeadname(){
  this.warnHeadname=!this.advert.headname;
}
checkHeadphone(){
  this.warnHeadphone=!this.advert.headphone;
}
checkHeadEmail(){
this.warnHeadEmail=!this.advert.heademail;
}
}



@Component({
  selector: 'app-over-dialog',
  template: `<h1>dsa</h1>`
})
export class DialogOverviewExampleDialog implements OnInit {
  ngOnInit() {
  }


}