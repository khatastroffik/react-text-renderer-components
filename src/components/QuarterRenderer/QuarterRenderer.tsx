import { DateTimeFormatCache, getFromCache, NumberFormatCache } from "../../shared/CacheManager";
import { AbstractRenderer, IAbstractRendererProps, IDateValue, ModifyValueType } from "../AbstractRenderer";

export const defaultQuarterFormatOptions: Intl.NumberFormatOptions = { minimumIntegerDigits: 1 };
export const defaultYearFormatOptions: Intl.DateTimeFormatOptions = { year: "numeric" };

export interface IQuarterRendererProps extends ModifyValueType<IAbstractRendererProps, IDateValue> {
    displayYear?: boolean;
}

const _QuarterFormatterCache: NumberFormatCache = {};
const _YearFormatterCache: DateTimeFormatCache = {};

export class QuarterRenderer extends AbstractRenderer<Date, IQuarterRendererProps> {
    protected getFormatedText(): string {
        if (this.value) {
            const quarterFormatter = getFromCache<Intl.NumberFormat>(_QuarterFormatterCache, Intl.NumberFormat, undefined, defaultQuarterFormatOptions);
            const yearFormatter = getFromCache<Intl.DateTimeFormat>(_YearFormatterCache, Intl.DateTimeFormat, undefined, defaultYearFormatOptions);
            return quarterFormatter.format(calcQuarter(this.value)) + (this.props.displayYear ? "/" + yearFormatter.format(this.value) : "");
        } else {
            return "";
        }
    }
}

export function calcQuarter(inputDate: Date): number {
    // getMonth() --> value range is 0..11
    return Math.floor(1 + inputDate.getMonth() / 3)
}

/** FOR FUTURE DEVELOPMENT *******************************************

var date = new Date();
ops = {year: "numeric"};
// Default calendar
const manually = new Intl.DateTimeFormat('en-GB', ops).format(new Date()));
// Islamic calendar
console.log(new Intl.DateTimeFormat('en-GB-u-ca-islamic', ops).format(new Date()));
// Japanese Imperial calendar
console.log(new Intl.DateTimeFormat('en-GB-u-ca-japanese', ops).format(new Date()));
// Ethiopic calendar
console.log(new Intl.DateTimeFormat('en-GB-u-ca-ethiopic', ops).format(new Date()));
// Traditional Hebrew calendar
console.log(new Intl.DateTimeFormat('en-GB-u-ca-hebrew', ops).format(new Date()));
// Indian calendar
console.log(new Intl.DateTimeFormat('en-GB-u-ca-indian', ops).format(new Date()));

see also: https://stackoverflow.com/a/75602964

 *********************************************************************/
