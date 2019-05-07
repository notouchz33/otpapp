import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalvarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalvarProvider {
  baseURLAPI:string = "http://111.223.52.8/services_otp/services/";
  baseURLimg:string = "http://111.223.52.8/services_otp/services/images/";

  // baseURLAPI:string = "services_otp/";
  // baseURLimg:string = "services_otp/images/";

  constructor() {;
  }

}
