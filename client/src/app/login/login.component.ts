import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KiwiService } from '../kiwi.service';
import { SocketService } from '../socketconfig/socketconfig.service';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    //kiwi login form
    loginForm = new FormGroup({
        userName: new FormControl('', Validators.required),
        userPass: new FormControl('', Validators.required),
    });
    //login details
    userData: any;
    currentUser = JSON.parse(localStorage.getItem('kiwi-user')) || [];

    constructor(
        private router: Router,
        private kiwiService: KiwiService,
        private socketService: SocketService

    ) { }

    ngOnInit() {

        //checks if the user is logged in already
        if (this.currentUser.id) {
            this.router.navigate(['kiwi-chat']);
        } else {
            this.router.navigate(['login']);
        }
    }

    //login to kiwi chat
    kiwiLogin(): void {
        this.userData = this.loginForm.value;

        this.kiwiService.kiwiLogin({ username: this.userData.userName, password: this.userData.userPass }).subscribe(res => {
            if (res.userId) {
                //save user details to local storage
                let memberObj = res.user;
                res.user.isLoggedIn = true;
                localStorage.setItem('kiwi-user', JSON.stringify(memberObj));

                this.currentUser = JSON.parse(localStorage.getItem('kiwi-user'));
                this.router.navigate(['kiwi-chat']);

                //socket service
                console.log(res.userId);
                this.socketService.connect(res.userId);
                this.socketService.getStatus().subscribe((_d) => {
                    console.log('____d',_d);
                    this.socketService.createSession(res.userId, _d.socketId);
                });
            }
        }, (err => {
            alert('invalid credentials');
        }));
    }//kiwi-login



}
