import { getFromCache } from "../../shared/CacheManager";
import { AbstractRenderer, IAbstractRendererProps, ModifyValueType } from "../AbstractRenderer";

export const defaultDateTimeRendererFormatOptions: Intl.DateTimeFormatOptions = { dateStyle: "short", timeStyle: "short" };

interface DateTimeRendererValue {
    value: Date;
}

export interface IDateTimeRendererProps extends ModifyValueType<IAbstractRendererProps, DateTimeRendererValue> {
    locale?: Intl.LocalesArgument;
    formatOptions?: Intl.DateTimeFormatOptions;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _DateTimeRendererCache: any = {};

export class DateTimeRenderer extends AbstractRenderer<Date, IDateTimeRendererProps> {
    protected getFormatedText(): string {
        const options = this.props.formatOptions ?? defaultDateTimeRendererFormatOptions;
        const formater = this.value && getFromCache<Intl.DateTimeFormat>(_DateTimeRendererCache, Intl.DateTimeFormat, this.props.locale, options);
        return this.value ? formater.format(this.value) : "";
        // return this.value ? new Intl.DateTimeFormat(this.props.locale, options).format(this.value) : "";
    }
}