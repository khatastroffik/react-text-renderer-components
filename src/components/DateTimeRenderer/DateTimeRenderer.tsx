import { AbstractRenderer, IAbstractRendererProps, ModifyValueType } from "../AbstractRenderer";

export const defaultDateTimeRendererFormatOptions: Intl.DateTimeFormatOptions = { dateStyle: "short", timeStyle: "short" };

interface DateTimeRendererValue {
    value: Date;
}

export interface IDateTimeRendererProps extends ModifyValueType<IAbstractRendererProps, DateTimeRendererValue> {
    locale?: Intl.LocalesArgument;
    formatOptions?: Intl.DateTimeFormatOptions;
}

export class DateTimeRenderer extends AbstractRenderer<Date, IDateTimeRendererProps> {
    protected getFormatedText(): string {
        const options = this.props.formatOptions ?? defaultDateTimeRendererFormatOptions;
        return this.value ? new Intl.DateTimeFormat(this.props.locale, options).format(this.value) : "";
    }
}