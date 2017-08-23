import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ConfigService } from '../../../services/config.service';
import { Types } from '../../../types';

@Component({
  selector: 'app-advert-publish-task-page',
  templateUrl: './advert-publish-task-page.component.html',
  styleUrls: ['./advert-publish-task-page.component.css']
})
export class AdvertPublishTaskPageComponent implements OnInit {
  type = 'url';
  taskNums = [];
  taskTags: Types.ITaskTag[] = [];
  selectedTaskTag: Types.ITaskTag = { _id: '', name: '', sort: 0 };
  step = 0;
  newTask: Types.ITask = {
    
    title: '',
    createDt: new Date(),
    fee: 0,
    publisher: '',
    shareMoney: 0,
    // 余额
    totalMoney: 0,
    active: false,
    websiteUrl: '',
    bannerImg: '',
    taskTag: '',
  };
  isNew: boolean = true;
  bannerUrlSafe: SafeStyle;
  constructor(public config: ConfigService, public safe: DomSanitizer) {
    this.getTaskTagList();
    // 编辑任务的ID
    let taskId = this.config.route.snapshot.queryParams.taskId;
    if (taskId) {
      this.getTaskById(taskId);
      this.isNew = false;
    }

  }

  ngOnInit() {
  }
  async getTaskById(_id: string) {
    this.newTask = await this.config.Get('/advert.task.go?_id=' + _id);
    this.selectedTaskTag = await this.config.Get('/admin.rest.go?model=taskTagModel&_id='+this.newTask.taskTag);
    this.step = 3;
  }
  selectTaskTag(taskTag: Types.ITaskTag) {
    this.selectedTaskTag = taskTag;
    console.log(taskTag);
  }
  showDatePicker() {
    window['$']("#calendar").asDatepicker();
  }
  async  getTaskTagList() {
    this.taskTags = await this.config.Get('/advert.taskTags.go');

    this.selectedTaskTag = this.taskTags[0] || {name:'默认',_id:'',sort:0};
  }

  safeBackground(url) {
    this.bannerUrlSafe = this.safe.bypassSecurityTrustStyle('url(' + url + ')')

  }

  // 上传图片
  async uploadTaskImageUrl(file: File) {
    let base64 = await this.config.convertFileToBase64(file);//图片转换成base64位
    let compressData = await this.config.compressBase64(base64,640000);//压缩图片
    this.newTask.imageUrl = await this.config.PostLocal(`/api.uploadBase64.go`, { base64: compressData });
  }
  // 上传广告banner图
  async uploadTaskBannerUrl(file: File) {
    let base64 = await this.config.convertFileToBase64(file);
    // let compressData = await this.config.compressBase64(base64);
    this.newTask.bannerImg = await this.config.PostLocal(`/api.uploadBase64.go`, { base64 });
  }
  //任务修改
  async saveNewItem() {
    if (this.isNew) {
      this.newTask.taskTag =<any>this.selectedTaskTag._id;
      this.newTask.publisher = this.config.advert._id;
      let result = await this.config.Post('/advert.publishTask.go', this.newTask);
    } else {
      await this.config.Put('/admin.rest.go?model=taskModel&_id=' + this.newTask._id, this.newTask);
    }
    this.config.router.navigateByUrl('/advert');

  }
}
