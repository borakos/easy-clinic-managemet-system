import { Pipe, PipeTransform } from '@angular/core';
import { Doctor } from './types';
import { Pharmacy } from '../_providers/types';

@Pipe({ name: 'formatPharmacies' })
export class FormatPharmacies implements PipeTransform {
    transform(pharmacies: Pharmacy[]): any {
        let temporaryGroups = {};
        for(let i = 0; i < pharmacies.length; i++){
			let city = pharmacies[i].city
			if(temporaryGroups.hasOwnProperty(city)){
				temporaryGroups[city].push({id: pharmacies[i].id, name: pharmacies[i].name});
			} else {
				temporaryGroups[city] = [{id: pharmacies[i].id, name: pharmacies[i].name}];
			}
        }
        let finalGroups = [];
        for (let key in temporaryGroups) {
            finalGroups.push({key: key, pharmacies: temporaryGroups[key]});
        }
        return finalGroups;
    }
}