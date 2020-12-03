import { Pipe, PipeTransform } from '@angular/core';
import { Doctor } from './types';

@Pipe({ name: 'formatDoctors' })
export class FormatDoctors implements PipeTransform {
    transform(doctors: Doctor[]): any {
        let temporaryGroups = {};
        for(let i = 0; i < doctors.length; i++){
            for(let j = 0; j < doctors[i].specializations.length; j++){
                let spec = doctors[i].specializations[j];
                if(temporaryGroups.hasOwnProperty(spec)){
                    temporaryGroups[spec].push({id: doctors[i].id, name: doctors[i].nativeName});
                } else {
                    temporaryGroups[spec] = [{id: doctors[i].id, name: doctors[i].nativeName}];
                }
            }
        }
        let finalGroups = [];
        for (let key in temporaryGroups) {
            finalGroups.push({key: key, doctors: temporaryGroups[key]});
        }
        return finalGroups;
    }
}