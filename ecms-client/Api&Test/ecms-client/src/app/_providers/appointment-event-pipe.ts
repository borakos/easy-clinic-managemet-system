import { Pipe, PipeTransform } from '@angular/core';
import { AppointmentEvent } from './types';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';

const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
    },
    green: {
        primary: '#21ad28',
        secondary: '#e3fae6',
    },
};

@Pipe({ name: 'formatAppointmentEvents' })
export class FormatAppointmentEvents implements PipeTransform {
    transform(events: AppointmentEvent[], actions?: CalendarEventAction[]): any {
        if(events){
            let calendarEvents: CalendarEvent[] = [];
            for(let event of events){
                calendarEvents.push({
                    id: event.id,
                    start: event.start,
                    end: event.end,
                    title: event.label,
                    color: event.isFree ? colors.green : colors.red,
                    actions: event.isFree ? actions : undefined,
                    isFree: event.isFree
                } as CalendarEvent)
            }
            return calendarEvents;
        } else {
            return [];
        }
    }
}