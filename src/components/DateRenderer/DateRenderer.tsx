import { AbstractRenderer, IAbstractRendererProps, IDateValue, ModifyValueType } from "../AbstractRenderer";
import { DateTimeFormatCache, getFromCache } from "../../shared/CacheManager";

export const defaultDateRendererFormatOptions: Intl.DateTimeFormatOptions = { dateStyle: "medium" };

export interface IDateRendererProps extends ModifyValueType<IAbstractRendererProps, IDateValue> {
    locale?: Intl.LocalesArgument
    timeZone?: string;
}

const _DateFormatterCache: DateTimeFormatCache = {};

export class DateRenderer extends AbstractRenderer<Date, IDateRendererProps> {
    protected getFormatedText(): string {
        const options = { ...defaultDateRendererFormatOptions, ...this.props.timeZone && { timeZone: this.props.timeZone } };
        const formater = this.value && getFromCache<Intl.DateTimeFormat>(_DateFormatterCache, Intl.DateTimeFormat, this.props.locale, options );
        return this.value ? formater.format(this.value) : "";
    }
}
