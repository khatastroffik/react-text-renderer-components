import { DateTimeFormatCache, getFromCache } from "../../shared/CacheManager";
import { AbstractRenderer, IAbstractRendererProps, IDateValue, ModifyValueType } from "../AbstractRenderer";

export const defaultTimeRendererFormatOptions: Intl.DateTimeFormatOptions = { timeStyle: "medium" };

export interface ITimeRendererProps extends ModifyValueType<IAbstractRendererProps, IDateValue> {
    locale?: Intl.LocalesArgument;
    timeZone?: string;
}

const _TimeFormatterCache: DateTimeFormatCache = {};

export class TimeRenderer extends AbstractRenderer<Date, ITimeRendererProps> {
    protected getFormatedText(): string {
        const options = { ...defaultTimeRendererFormatOptions, ... this.props.timeZone && { timeZone: this.props.timeZone } };
        const formater = this.value && getFromCache<Intl.DateTimeFormat>(_TimeFormatterCache, Intl.DateTimeFormat, this.props.locale, options);
        return this.value ? formater.format(this.value) : "";
    }
}
