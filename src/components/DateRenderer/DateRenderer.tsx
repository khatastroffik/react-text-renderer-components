import { AbstractRenderer, IAbstractRendererProps, ModifyValueType } from "../AbstractRenderer";
import { getFromCache } from "../../shared/CacheManager";

export const defaultDateRendererFormatOptions: Intl.DateTimeFormatOptions = { dateStyle: "medium" };

interface DateRendererValue {
    value: Date;
}

export interface IDateRendererProps extends ModifyValueType<IAbstractRendererProps, DateRendererValue> {
    locale?: Intl.LocalesArgument
    timeZone?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _DateRendererCache: any = {};

export class DateRenderer extends AbstractRenderer<Date, IDateRendererProps> {
    
    protected getFormatedText(): string {
        const options = { ...defaultDateRendererFormatOptions, ...this.props.timeZone && { timeZone: this.props.timeZone } };
        const formater = this.value && getFromCache<Intl.DateTimeFormat>(_DateRendererCache, Intl.DateTimeFormat, this.props.locale, options );
        return this.value ? formater.format(this.value) : "";
        // return this.value ? new Intl.DateTimeFormat(this.props.locale, options).format(this.value) : "";
    }
}
