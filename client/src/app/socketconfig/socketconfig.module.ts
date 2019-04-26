
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from './socketconfig.service';
import { HttpClientModule } from '@angular/common/http';
let base_url = 'localhost:3000';

const config: SocketIoConfig = { url: base_url, options: {} };

//const config: SocketIoConfig = { url: base_url, options: {} };

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        SocketIoModule.forRoot(config)
    ],
    providers: [SocketService],
    declarations: []
})
export class SoketConfigsModule { }