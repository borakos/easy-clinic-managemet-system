import { Pipe, PipeTransform } from '@angular/core';
import { AppointmentEvent } from './types';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { colors } from './colors';

@Pipe({ name: 'FormatAppointmentEventDoctors' })
export class FormatAppointmentEventDoctors implements PipeTransform {
    transform(events: AppointmentEvent[], actions?: CalendarEventAction[]): any {
        if(events){
            let calendarEvents: CalendarEvent[] = [];
            for(let event of events){
                calendarEvents.push({
                    id: event.id,
                    start: event.start,
                    end: event.end,
                    title: event.label,
                    color: event.isFree ? colors.blue : event.isAccepted ? colors.red : colors.yellow,
                    actions: actions,
                    isFree: event.isFree
                } as CalendarEvent)
            }
            return calendarEvents;
        } else {
            return [];
        }
    }
}