import { AbstractRenderer, IAbstractRendererProps, ModifyValueType } from "../AbstractRenderer";


export const defaultDateRendererFormatOptions: Intl.DateTimeFormatOptions = {dateStyle: "medium"};

interface DateRendererValue {
    value: Date;
}

export interface IDateRendererProps extends ModifyValueType<IAbstractRendererProps, DateRendererValue> {
    locale?: Intl.LocalesArgument
}

export class DateRenderer extends AbstractRenderer<Date, IDateRendererProps> {
    protected getFormatedText(): string {
        return this.value ? new Intl.DateTimeFormat(this.props.locale, defaultDateRendererFormatOptions).format(this.value) : "";
    }
}