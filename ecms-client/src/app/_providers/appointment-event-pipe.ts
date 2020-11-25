import { Pipe, PipeTransform } from '@angular/core';
import { AppointmentEvent } from './types';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { colors } from './colors';

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