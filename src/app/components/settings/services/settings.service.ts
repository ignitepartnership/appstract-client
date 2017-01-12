


import {Injectable} from '@angular/core';
const storage = require('electron-storage');

@Injectable()
export class SettingService{
    public settings:any;

    getSettings(){
       return  storage.get('settings')
            .then((data:any) => {
                this.settings = data;
                console.log(this.settings)
                return data;
            })
    }


}





