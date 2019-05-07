import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebapiServiceProvider } from '../../providers/webapi-service/webapi-service';

/**
 * Generated class for the OtpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {

  userData = {
    "user":'',
  }
  responseData:any;
  code:any;

  time:any;
  runTimer:any;
  hasStarted:any;
  hasFinished:any;
  remainingTime:any;
  timeInSeconds:any;
  displayTime:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:WebapiServiceProvider
    ) {
      
    this.userData.user = localStorage.getItem('loginstatus');
  }

  ionViewDidLoad() {
    this.genNewOtp();
    this.startTimer();
  }

  ngOnInit() {
    this.initTimer();
  }

  initTimer() {
    if (!this.timeInSeconds) {
      this.timeInSeconds = 15;
    }

    this.time = this.timeInSeconds;
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.remainingTime = this.timeInSeconds;

    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
  }


  startTimer() {
    this.runTimer = true;
    this.hasStarted = true;
    this.timerTick();
  }

  resumeTimer() {
    this.startTimer();
  }

  timerTick() {
    setTimeout(() => {

      if (!this.runTimer) { return; }
      this.remainingTime--;
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
      if (this.remainingTime > 0) {
        this.timerTick();
      }
      else {
        // this.hasFinished = true;
        this.genNewOtp();
        this.ngOnInit();
        this.startTimer();
      }
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var secondsString = '';
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return secondsString;
  }

  genNewOtp(){
      this.webapi.postData(this.userData,"genotp.php").then((result)=>{
        this.responseData = result;
        if (this.responseData.message.status == "success") {
          this.code = this.responseData.message.text;
        }else{
          this.hasFinished = true;
          this.code = this.responseData.message.text;
        }
      });
  }


}
