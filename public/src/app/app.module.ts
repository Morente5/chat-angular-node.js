import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LocalStorageModule } from 'angular-2-local-storage';

import { WindowComponent } from './chat-window.component';
import { ChannelsComponent } from './components/channels/channels.component';
import { ChatInputComponent } from './components/chat/chat-input/chat-input.component';
import { ChatMessagesComponent } from './components/chat/chat-messages/chat-messages.component';
import { ChatStatusComponent } from './components/chat/chat-status/chat-status.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { ChannelAddComponent } from './components/channel-add/channel-add.component';

import { LoginService } from './services/login.service';
import { ChannelsService } from './services/channels.service';


@NgModule({
  declarations: [
    WindowComponent,
    ChannelsComponent,
    ChatInputComponent,
    ChatMessagesComponent,
    ChatStatusComponent,
    LoginComponent,
    UserComponent,
    ChannelAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LocalStorageModule.withConfig({
      prefix: 'chat',
      storageType: 'localStorage'
    }),
  ],
  providers: [ChannelsComponent, LoginService, ChannelsService],
  bootstrap: [WindowComponent]
})
export class AppModule { }
