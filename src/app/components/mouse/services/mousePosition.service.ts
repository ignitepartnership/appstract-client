export interface MousePositionInterface {
    x: number,
    y: number
}

import {Injectable, NgZone} from '@angular/core';
import { SocketService } from '../../socket/services/socket.service';

const electron = require('electron');

const storage = require('electron-storage');
var ip = require("ip");



@Injectable()
export class MousePositionService {
    public intervalID: any;
    public mousePosition: MousePositionInterface = {
        x: 0,
        y: 0
    };
    private socket:any;

    constructor(private zone: NgZone, public socketService: SocketService) {

        console.log("starting mouse tracker")
        this.start();

    }
    isSamePosition(mouse: any) {
        return ((mouse.x == this.mousePosition.x) && (mouse.y == this.mousePosition.y))
    }

    loop() {
        let mouse = electron.screen.getCursorScreenPoint();

        if (!this.isSamePosition(mouse) && this.socketService.connected) {
            this.socket = this.socketService.getSocket();
            //console.log(this.socket);
            //console.log('sending mouse position %s %s', JSON.stringify({ x: mouse.x, y:mouse.y, id:socket.id, ip: ip.address()}), Date.now())
            console.log('sending mouse position %s %s', JSON.stringify({x: mouse.x, y: mouse.y}), Date.now())

            this.socket.emit('mouseEvent', { x: mouse.x, y:mouse.y, id:this.socket.id, ip: ip.address()});
            this.mousePosition = {
                x: mouse.x,
                y: mouse.y
            }
        }

    }

    start(){
        this.intervalID = setInterval(() => this.loop(), 10);
    }






}




