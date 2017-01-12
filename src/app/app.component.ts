import {Component, NgZone, ViewEncapsulation} from '@angular/core';

import {ipcRenderer, shell} from  'electron';
const storage = require('electron-storage');
import {SettingService} from './components/settings/services/settings.service'


import {SocketService} from './components/socket/services/socket.service';
import { MousePositionService } from './components/mouse/services/mousePosition.service';


@Component({
    selector: 'my-app',
    template: require('./app.component.pug'),
    styles:[require('./app.component.css')],
    encapsulation: ViewEncapsulation.None

})
export class AppComponent{
    connected = false;
    public socket:any;
    public viewUrl:string;
    constructor(public socketService: SocketService, private mousePositionService: MousePositionService, private zone: NgZone, private settingsService:SettingService) {

        settingsService.getSettings().then((data:any)=>{
            let re = /https?:\/\/[^:\/]+/i;
            this.viewUrl = re.exec(data.socketio.url).toString();
        });

    }


    openUrl(input:string){
        shell.openExternal(input)
    }
    openAppstractViewer(){
        shell.openExternal(`${this.viewUrl}:4200`)
    }
    quit(){
        console.log("sending quit")
        ipcRenderer.send('quit');
    }
    restart(){
        ipcRenderer.send('restart');

    }


}
