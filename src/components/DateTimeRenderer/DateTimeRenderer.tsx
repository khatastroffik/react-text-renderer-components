import { DateTimeFormatCache, getFromCache } from "../../shared/CacheManager";
import { AbstractRenderer, IAbstractRendererProps, IDateValue, ModifyValueType } from "../AbstractRenderer";

export const defaultDateTimeRendererFormatOptions: Intl.DateTimeFormatOptions = { dateStyle: "short", timeStyle: "short" };

export interface IDateTimeRendererProps extends ModifyValueType<IAbstractRendererProps, IDateValue> {
    locale?: Intl.LocalesArgument;
    formatOptions?: Intl.DateTimeFormatOptions;
}

const _DateTimeFormatterCache: DateTimeFormatCache = {};

export class DateTimeRenderer extends AbstractRenderer<Date, IDateTimeRendererProps> {
    protected getFormatedText(): string {
        const options = this.props.formatOptions ?? defaultDateTimeRendererFormatOptions;
        const formater = this.value && getFromCache<Intl.DateTimeFormat>(_DateTimeFormatterCache, Intl.DateTimeFormat, this.props.locale, options);
        return this.value ? formater.format(this.value) : "";
    }
}
