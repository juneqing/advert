
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Types } from '../types/types';
@Injectable()
export class ConfigService {
  crossDomain = true;
  adminIp = 'http://47.92.87.28';
  manageIp = 'http://47.92.87.28';
  serverIp = 'http://47.92.87.28';
  localIp = 'http://47.92.87.28';

  get advert(): Types.Advert {
    var admin = localStorage.getItem('advert') ;
    return admin ? JSON.parse(admin) : false;
  }
  set advert(advert: Types.Advert) {
    localStorage.setItem('advert', JSON.stringify(advert));

  }

  get admin() {
    var admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin) : false;

  }
  set admin(obj: { username: string, password: string }) {
    localStorage.setItem('admin', JSON.stringify(obj));

  }
  GetServer(action: string, options?: RequestOptionsArgs) {
    return this.http.get(`${this.serverIp}/share-server/${action}`, options).toPromise().then(rtn => { let result = rtn.json(); return result.ok ? result.data : alert(result.data); })
  }
  PostServer(action: string, body?: any, options?: RequestOptionsArgs) {
    return this.http.post(`${this.serverIp}/share-server/${action}`, body, options).toPromise().then(rtn => { let result = rtn.json(); return result.ok ? result.data : alert(result.data); });
  }

  DeleteServer(action: string, options?: RequestOptionsArgs) {
    return this.http.delete(`${this.serverIp}/share-server/${action}`, options).toPromise().then(rtn => { let result = rtn.json(); return result.ok ? result.data : alert(result.data); });
  }

  PutServer(action: string, body, options?: RequestOptionsArgs) {
    return this.http.put(`${this.serverIp}/share-server/${action}`, body, options).toPromise().then(rtn => { let result = rtn.json(); return result.ok ? result.data : alert(result.data); });
  }

  Get(url: string, options?: RequestOptionsArgs) {
    return this.http.get(`${this.serverIp}${url}`, options).toPromise().then(rtn => { let result = rtn.json(); return result.ok ? result.data : alert(result.data); })
  }
  Post(url: string, body?: any, options?: RequestOptionsArgs) {
    return this.http.post(`${this.serverIp}${url}`, body, options).toPromise().then(rtn => { let result = rtn.json(); return result.ok ? result.data : alert(result.data); });
  }

  Delete(url: string, options?: RequestOptionsArgs) {
    return this.http.delete(`${this.adminIp}${url}`, options).toPromise().then(rtn => { let result = rtn.json(); return result.ok ? result.data : alert(result.data); });
  }

  Put(url: string, body, options?: RequestOptionsArgs) {
    return this.http.put(`${this.adminIp}${url}`, body, options).toPromise().then(rtn => { let result = rtn.json(); return result.ok ? result.data : alert(result.data); });
  }
  GetLocal(url: string, options?: RequestOptionsArgs) {
    return this.http.get(`${this.localIp}${url}`, options).toPromise().then(rtn => { let result = rtn.json(); return result.ok ? result.data : alert(result.data); })
  }
  PostLocal(url: string, body?: any, options?: RequestOptionsArgs) {

    return this.http.post(`${this.localIp}${url}`, body, options).toPromise().then(rtn => { let result = rtn.json(); return result.ok ? result.data : alert(result.data); });

  }

  DeleteLocal(url: string, options?: RequestOptionsArgs) {
    return this.http.delete(`${this.localIp}${url}`, options).toPromise().then(rtn => { let result = rtn.json(); return result.ok ? result.data : alert(result.data); });
  }

  PutLocal(url: string, body, options?: RequestOptionsArgs) {
    return this.http.put(`${this.localIp}${url}`, body, options).toPromise().then(rtn => { let result = rtn.json(); return result.ok ? result.data : alert(result.data); });
  }




  GetManage(action: string, options?: RequestOptionsArgs) {
    return this.http.get(`${this.manageIp}/share-manage/${action}`, options).toPromise().then(rtn => { let result = rtn.json(); return result.ok ? result.data : alert(result.data); })
  }
  PostManage(action: string, body?: any, options?: RequestOptionsArgs) {
    return this.http.post(`${this.manageIp}/share-manage/${action}`, body, options).toPromise().then(rtn => { let result = rtn.json(); return result.ok ? result.data : alert(result.data); });
  }

  PutManage(action: string, body, options?: RequestOptionsArgs) {
    return this.http.put(`${this.manageIp}/share-manage/${action}`, body, options).toPromise().then(rtn => { let result = rtn.json(); return result.ok ? result.data : alert(result.data); });
  }
  DeleteManage(action: string, options?: RequestOptionsArgs) {
    return this.http.delete(`${this.manageIp}/share-manage/${action}`, options).toPromise().then(rtn => { let result = rtn.json(); return result.ok ? result.data : alert(result.data); });
  }

  /**
   * 
   * @param url   file
  * 
   * @param outputFormat string
   * 
   * 将文件转成base64
   */
  compressBase64(base64: string, maxsize: number = 40000, outputFormat = "image/png"): Promise<string> {

    return new Promise((resolve, reject) => {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var img = new Image;
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        var width = img.width;
        var height = img.height;
        let compress = 1;
        let rate = 1
        if (width * height > maxsize) { rate = Math.ceil(width * height / 40000); }
        compress = 1 / rate;
        canvas.width = width * compress;
        canvas.height = height * compress;
        ctx.drawImage(img, 0, 0, width, height, 0, 0, width * compress, height * compress);
        let compressData = canvas.toDataURL(outputFormat)
        resolve(compressData);
      };
      img.src = base64;
    });
  }

  convertFileToBase64(file: File): Promise<string> {
    let reader = new FileReader();
    return new Promise((resolve, reject) => {

      reader.onload = (e) => {
        let base64: string = <string>e.target['result']
        resolve(base64);
      }
      reader.readAsDataURL(file);
    });

  }




  constructor(public router: Router, public route: ActivatedRoute, public http: Http) { }

}
