import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { Types } from '../../../types/types'
@Component({
  selector: 'app-advert-home-page',
  templateUrl: './advert-home-page.component.html',
  styleUrls: ['./advert-home-page.component.css']
})
export class AdvertHomePageComponent implements OnInit {
  advert: Types.Advert;
  step: number = 0;
  task: Types.ITask[] = [];
  tasks: Types.ITask[] = [];
  showMessage = true;
  selectedTask: Types.ITask;
  hour24: Array<any> = [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], label: '每小时点击次数' }];
  hour24Labels = [
    '1时', '2时', '3时', '4时', '5时', '6时',
    '7时', '8时', '9时', '10时', '11时', '12时',
    '13时', '14时', '15时', '16时', '17时', '18时',
    '19时', '20时', '21时', '22时', '23时', '24时'];
  oneWeek: Array<any> = [{ data: [0, 0, 0, 0, 0, 0, 0], label: '每天点击次数' }];
  oneWeekLabels = ['周六', '周日', '周一', '周二', '周三', '周四', '周五'];
  oneMonth: Array<any> = [{
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0
    ], label: '每天点击次数'
  }];
  oneMonthLables = new Array(31).fill('').map((value, index) => index);
  constructor(public config: ConfigService) {
    this.advert = this.config.advert;
    this.syncAdvert();
    this.taskList();
  }

  async syncAdvert(){
   this.advert =  await this.config.Get('/advert.info.go?_id='+this.config.advert._id)
  }
  ngOnInit() {
  }
  async taskList() {
    this.tasks = await this.config.Get("/advert.taskByAdvertId.go?_id=" + this.advert._id);
    this.selectedTask = this.tasks[0];
  }
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40, 88, 56, 75, 68, 49, 65, 59, 80, 81, 56, 55, 40, 88, 56, 75, 68, 49], label: '点击次数' }
  ];


  async showTaskOneDayData(task: Types.ITask) {
    let oneDayData = await this.config.Get('/advert.taskOneDayData.go?taskId=' + task._id);
    this.selectedTask = task;
    this.hour24 = [{
      data: oneDayData,
      label: '每小时次数'
    }];


  }
  //启用/禁用任务
  async toggleTaskActive(task: Types.ITask) {
    await this.config.Put('/advert.taskActive.go?_id=' + task._id, { active: !task.active });
    await this.taskList();

  }
  async showTaskWeekData(task: Types.ITask) {
    let oneWeekData = await this.config.Get('/advert.taskWeekData.go?taskId=' + task._id);
    this.selectedTask = task;
    this.oneWeek = [{
      data: oneWeekData,
      label: '每天点击次数'
    }];

  }
  async showTaskMonthData(task: Types.ITask) {
    let oneMonthData = await this.config.Get('/advert.taskOneMonthData.go?taskId=' + task._id);
    this.selectedTask = task;
    this.oneMonth = [{
      data: oneMonthData,
      label: '每天点击次数'
    }];
  }
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';



  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  editTask(task: Types.ITask) {
    this.config.router.navigateByUrl('/advert/publish-task?taskId=' + task._id);
  }
  
  // 点击复制任务推广链接地址
   copyTaskLink(task:Types.ITask){  
   let Url=`http://wq8.youqulexiang.com/share/taskDetail?taskId=`+task._id
   let textareaEle = document.getElementsByTagName('textarea').item(0);
   textareaEle.value=Url;
   textareaEle.select();
   document.execCommand("Copy"); // 执行浏览器复制命令
  alert("链接已复制至剪切板,可粘贴");
  }
}
