import {SocketInterface} from './socket.service.interface'
import {SettingService} from '../../settings/services/settings.service'

let io = require('socket.io-client');


import {Injectable, NgZone} from '@angular/core';
const storage = require('electron-storage');

@Injectable()
export class SocketService{

    public socket:any;
    public socket_url:string;
    public connected: boolean = false;

    constructor(private settingsService:SettingService, private zone: NgZone){

       settingsService.getSettings().then((data:any)=>{
            this.socket_url = data.socketio.url;
            this.start();
       });

    }

    start(){
        this.socket = io.connect(this.socket_url, {reconnect: true});

        this.socket.on('connect', ()=> {
            // this.zone.run(() => {
            //     this.connected = true;
            // });
            this.connected = true;
            console.log("connected to socket.io");
        })
        this.socket.on('connect_failed', ()=>{
            console.log('Connection Failed');
        });

        this.socket.on("reconnecting", () =>{

            console.log('reconnecting')
        })
    }

    getSocket(){
        return this.socket;
    }


}




