import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { CalendarNativeDateFormatter, DateFormatterParams } from 'angular-calendar';

@Injectable({
    providedIn: 'root'
})
export class MilitaryDateFormatter extends CalendarNativeDateFormatter {

    public dayViewHour({ date, locale }: DateFormatterParams): string {
        return formatDate(date, 'HH:mm', locale);
    }

    public weekViewHour({ date, locale }: DateFormatterParams): string {
        return formatDate(date, 'HH:mm', locale);
    }
}