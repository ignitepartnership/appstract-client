import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { SettingComponent } from './components/settings/settings.component';

const menubar = require('menubar')


import { SocketService } from './components/socket/services/socket.service';
import { SettingService } from './components/settings/services/settings.service';
import { MousePositionService } from './components/mouse/services/mousePosition.service';

@NgModule({
    imports: [ BrowserModule,FormsModule, NgbModule.forRoot() ],
    declarations: [ AppComponent,SettingComponent ],
    providers:[SocketService, SettingService,MousePositionService],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
