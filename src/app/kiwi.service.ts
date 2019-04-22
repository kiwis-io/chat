import { Injectable } from '@angular/core';
import { MemberApi } from './core/sdk/';

@Injectable({
  providedIn: 'root'
})
export class KiwiService {

  constructor(
      private memberApi : MemberApi,
  ) { }

  //kiwi - login {gX}
  kiwiLogin(userData){
     return this.memberApi.login(userData);
  } 
}
