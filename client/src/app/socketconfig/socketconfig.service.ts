
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable ,  Subject } from "rxjs";
import 'rxjs/Rx';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
export class SocketService {
    public message: any = 'Hai i am Ajieee';
    nameChange: Subject<string> = new Subject<string>();
    constructor(private socket: Socket, private http: HttpClientModule) { }
    // socket: Socket
    connect(id: string) {
        // console.log("connect called", this.socket);
        // this.socket.on('connect', (data) => {
        //     // this.socket.emit("session", { userId: id, socketId: this.socket.ioSocket.id });
        // })
        // console.log("this.socket.ioSocket.id",this.socket.ioSocket.id);
        return this.socket.emit("session", { userId: id, socketId: this.socket.ioSocket.id });
    }

    createSession(id: string, soketId: string) {
        return this.socket.emit("session", { userId: id, socketId: soketId });
    }

    logout(id) {
        this.socket.emit("logout", { userId: id, socketId: this.socket.ioSocket.id });
    }

    getStatus() {
        return this.socket
            .fromEvent("success").pipe(
            map((data: any) => {
                return data;
            }));
    }

    getNewNotification() {
        return this.socket
            .fromEvent("newNotification").pipe(
            map((data: any) => {
                return data;
            }));
    } 

    getNewVote() {
        return this.socket
            .fromEvent("newVote").pipe(
            map((data: any) => {
                return data;
            }));
    }  
    
    getWalletEnabledUpdate() {
        return this.socket
            .fromEvent("walletEnable").pipe(
            map((data: any) => {
                return data;
            }));
    } 
    getAssignedCompanyEnableUpdate() {
        return this.socket
            .fromEvent("assignedCompanyEnable").pipe(
            map((data: any) => {
                return data;
            }));
    }

    getNewMessage() {
        return this.socket
            .fromEvent("kiwi-message").pipe(
            map((data: any) => {
                return data;
            }));
    }

    getNewChat() {
        return this.socket
            .fromEvent("newChat").pipe(
            map((data: any) => {
                return data;
            }));
    }

    // getUserBlock() {
    //     return this.socket
    //         .fromEvent("userBlock")
    //         .map((data: any) => {
    //             console.log(data)
    //             return data;
    //         });
    // }    

    // profileUpdate() {
    //     return this.socket
    //         .fromEvent("profileUpdate")
    //         .map((data: any) => {
    //             return data;
    //         });
    // }

}