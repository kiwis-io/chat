import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SDKBrowserModule } from './core/sdk/index';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './chat/profile/profile.component';
import { KiwiService } from './kiwi.service';
import { SocketService } from './socketconfig/socketconfig.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };



@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpModule,
    HttpClientModule,
    SDKBrowserModule.forRoot(),
    SocketIoModule.forRoot(config) 
  ],
  providers: [KiwiService, SocketService,SocketIoModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
