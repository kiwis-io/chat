import { Component, OnInit } from '@angular/core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { KiwiService } from '../kiwi.service';
import { MessageApi } from '../core/sdk/services/custom/Message';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';







@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    faPaperPlane = faPaperPlane;
    faUpload = faUpload;
    msgs = [];
    defaultMsgs = [];
    firstMsg;
    kiwiMsg = new FormGroup({
        textMsg: new FormControl('', Validators.required),
        image: new FormControl(''),
    });
    kiwiImg;
    imageType;
    currentUser = JSON.parse(localStorage.getItem('kiwi-user')) || [];

    //details for image upload
    new_file_name;
    URL = 'http://localhost:3000' + '/api/containers/profile/upload';
    proSrc //used for profile picture source name

    base_url = 'http://localhost:3000';
    constructor(
        private kiwiService: KiwiService,
        public http: HttpClientModule,
        private socket: Socket,
        public https: Http,
        private router : Router
    ) { }

    ngOnInit() {

        this.kiwiService.getNewMessage().subscribe(res => {

            if (res.text_message !== null) {
                if (res.type == 'image') {
                    this.msgs.push({ 'image': res.text_message });
                }
                else {
                    this.msgs.push({ 'message': res.text_message });
                }
            }
        });

        //**get all messages ****/
        this.kiwiService.getAllMessages().subscribe(res => {

            if (res !== null) {
                for (let i = 0; i < res.length; i++) {
                    if ((res[i]['type']) == 'image') {
                        this.msgs.push({ 'image': res[i]['text_message'] });
                    } else {
                        this.msgs.push({ 'message': res[i]['text_message'] });
                        this.firstMsg = res[i]['text_message'];
                    }
                }
            }
        });
    }

    // //get file extension
    // getFileExtension(filename) {
    //     console.log('ext....',filename);
    //     return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
    // }

    //socket io
    sendMessage() {
        this.kiwiImg = this.proSrc;
        if (this.imageType == 'image/png' || this.imageType == 'image/jpeg') {
            this.imageType = 'image';
        }
        // this.socket.emit("kiwi-message", msg);
        if (this.kiwiImg != null) {
            let messageData = {
                sender_id: this.currentUser.id,
                receiver_id: '5cc19b5b18d55e72a54ac280',
                text_message: this.kiwiImg,
                type: this.imageType
            }
            this.kiwiService.sendMessage(messageData).subscribe(res => {
            });
            this.kiwiMsg.reset();
            this.proSrc = null;
        } else if (this.kiwiMsg.value.textMsg !== null) {
            let msg = this.kiwiMsg.value.textMsg.trim();
            if (msg != '') {
                let messageData = {
                    sender_id: this.currentUser.id,
                    receiver_id: '5cc19b5b18d55e72a54ac280',
                    text_message: msg,
                    type: 'text'
                }
                this.kiwiService.sendMessage(messageData).subscribe(res => {
                });
                this.kiwiMsg.reset();
            }
        }

        // let messageData = {
        //     sender_id: this.currentUser.id,
        //     receiver_id: '5cc19b5b18d55e72a54ac280',
        //     text_message: msg
        // }

        // console.log(this.msgs);
        // this.msgs = [];


    }

    //view profile
    viewProfile() {
        console.log('view profile');
        this.router.navigate(['kiwi-chat/profile']);
    }

    readURL(event, objecName): any {
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            const file: File = fileList[0];
            const file_ext = file.name.substr(file.name.lastIndexOf('.') + 1);
            this.new_file_name = new Date().getTime() + '.' + file_ext;
            const formData: FormData = new FormData();
            formData.append('uploadFile', file, this.new_file_name);
            const headers = new Headers();
            const options = new RequestOptions({ headers: headers });
            this.https.post(this.URL, formData, options).pipe(
                map(res => res.json()),
                catchError(error => observableThrowError(error)))
                .subscribe(
                    data => {
                        if (data) {
                            this.proSrc = data.result.files.uploadFile[0].name;
                            this.imageType = data.result.files.uploadFile[0].type;
                        }
                    },
                    error => { console.log(error); }
                );
        }
    }



}
