'use strict';
import {CalendarTypeEnum} from "./model/calendar-type.enum";
import {EventModel} from "./model/event.model";
import {GoogleCalendarGenerator} from "./generators/google-calendar.generator";
import {YahooCalendarGenerator} from "./generators/yahoo-calendar.generator";
import {IcsCalendarGenerator} from "./generators/ics-calendar.generator";
import {BaseCalendarGenerator} from "./generators/base-calendar.generator";

export class Add2CalendarService {

    private static _factory: [(EventModel) => BaseCalendarGenerator ];

    private static _constructor: void = (() => {
        Add2CalendarService._factory = [
            (event) => new GoogleCalendarGenerator(event),
            (event) => new YahooCalendarGenerator(event),
            (event) => new IcsCalendarGenerator(event),
            (event) => new IcsCalendarGenerator(event),
        ];
    })();

    public static getFor (type: CalendarTypeEnum, event: EventModel): string {
        return Add2CalendarService._factory[type](event).href;
    }
}