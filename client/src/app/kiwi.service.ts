import { Injectable } from '@angular/core';
import { MemberApi, MessageApi } from './core/sdk/';
import { Socket } from 'ngx-socket-io';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class KiwiService {

  constructor(
      private memberApi : MemberApi,
      private messageApi : MessageApi,
      private socket: Socket
  ) { 
  }

  //kiwi - login {gX}
  kiwiLogin(userData){
     return this.memberApi.login(userData);
  } 

  //send message
  sendMessage(msg){
      console.log(msg);
      return this.messageApi.sendMessage(msg);
  }

  getNewMessage() {
    return this.socket
        .fromEvent("kiwi-message").
        map((data: any) => {
            console.log('datare', data);
            return data;
        });
}

//get all saved messages on page init
getAllMessages(){
    return this.messageApi.find();
}

}
