import { AbstractRenderer, IAbstractRendererProps, ModifyValueType } from "../AbstractRenderer";


export const defaultWeekRendererFormatOptions: Intl.NumberFormatOptions = { minimumIntegerDigits: 2, useGrouping: false };

interface WeekRendererValue {
    value: Date;
}

type ISOWeek = {
    week: number;
    year: number;
}

export interface IWeekRendererProps extends ModifyValueType<IAbstractRendererProps, WeekRendererValue> {
    minimumIntegerDigits?: 1 | 2;
    displayYear?: boolean;
    numberingSystem?: string;
}

export class WeekRenderer extends AbstractRenderer<Date, IWeekRendererProps> {
    protected getFormatedText(): string {
        if (this.value) {

            const options = {
                ...defaultWeekRendererFormatOptions,
                ... this.props.minimumIntegerDigits && { minimumIntegerDigits: this.props.minimumIntegerDigits },
                ... this.props.numberingSystem && { numberingSystem: this.props.numberingSystem }
            };
            const isoWeek = calcISOWeek(this.value);
            const formatter = new Intl.NumberFormat(undefined, options);
            return formatter.format(isoWeek.week) + (this.props.displayYear ? "/" + formatter.format(isoWeek.year) : "");
        } else {
            return "";
        }
    }
}

// Returns the ISO calendar week corresponding to the input date.
export function calcISOWeek(inputDate: Date): ISOWeek {
    const purifiedDate = new Date(inputDate.getTime());
    // Remove Time part of the Date value
    purifiedDate.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    const thursday = purifiedDate;
    // This is the four-digit year corresponding to the input ISO week of the date.
    const year = calcYearOfISOCalendarWeek(thursday);
    // January 4 is always in week 1.
    const fourthOfJanuaryWeek = new Date(year, 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    const week = 1 + Math.round(((thursday.getTime() - fourthOfJanuaryWeek.getTime()) / 86400000 - 3 + (fourthOfJanuaryWeek.getDay() + 6) % 7) / 7);
    return { week, year }
}

// Returns the four-digit year corresponding to the ISO week of the date.
function calcYearOfISOCalendarWeek(inputDate: Date): number {
    const purifiedDate = new Date(inputDate.getTime());
    // Thursday in current week decides the year.
    purifiedDate.setDate(purifiedDate.getDate() + 3 - (purifiedDate.getDay() + 6) % 7);
    // console.log("4", purifiedDate);
    return purifiedDate.getFullYear();
}
