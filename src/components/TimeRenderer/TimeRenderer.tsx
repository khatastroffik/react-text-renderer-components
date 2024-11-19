import { getFromCache } from "../../shared/CacheManager";
import { AbstractRenderer, IAbstractRendererProps, ModifyValueType } from "../AbstractRenderer";

export const defaultTimeRendererFormatOptions: Intl.DateTimeFormatOptions = { timeStyle: "medium" };

export interface ITimeRendererProps extends ModifyValueType<IAbstractRendererProps, { value: Date }> {
    locale?: Intl.LocalesArgument;
    timeZone?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _TimeRendererCache: any = {};

export class TimeRenderer extends AbstractRenderer<Date, ITimeRendererProps> {
    getFormatedText(): string {
        const options = { ...defaultTimeRendererFormatOptions, ... this.props.timeZone && { timeZone: this.props.timeZone } };
        const formater = this.value && getFromCache<Intl.DateTimeFormat>(_TimeRendererCache, Intl.DateTimeFormat, this.props.locale, options);
        return this.value ? formater.format(this.value) : "";
        // return this.value ? new Intl.DateTimeFormat(this.props.locale, options).format(this.value) : "";
    }
}
