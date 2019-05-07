import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { WebapiServiceProvider } from '../../providers/webapi-service/webapi-service';
import { OtpPage } from '../otp/otp';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userData = {
    "username":'',
    "password":''
  }

  responseData:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:WebapiServiceProvider,
    public alertCtrl:AlertController
    ) {
      if (localStorage.getItem('loginstatus') !== null) {
        this.navCtrl.setRoot(OtpPage);
      }
  }

  login(){
    console.log(this.userData);
    this.webapi.postData(this.userData,"checklogin.php").then((result)=>{
      this.responseData = result;
      if (this.responseData.message.text == "Login Successful !!") {
        let alert = this.alertCtrl.create({
          title:"เข้าสู่ระบบ",
          subTitle:"เข้าสู่ระบบเรียบร้อยแล้ว",
          buttons:['close']
        });

        alert.present();

        localStorage.setItem("loginstatus",this.responseData.message.user);
        
        this.navCtrl.setRoot(OtpPage);
         //location.reload();
      }else{
        let alert = this.alertCtrl.create({
          title:"เข้าสู่ระบบ",
          subTitle:"ชื่อหรือรหัสผ่านผิดพลาด",
          buttons:['close']
        });

        alert.present();
      }
    });
  }

}
