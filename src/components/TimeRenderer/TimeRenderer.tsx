import { AbstractRenderer, IAbstractRendererProps, ModifyValueType } from "../AbstractRenderer";

export const defaultTimeRendererFormatOptions: Intl.DateTimeFormatOptions = { timeStyle: "medium" };

export interface ITimeRendererProps extends ModifyValueType<IAbstractRendererProps, { value: Date }> {
    locale?: Intl.LocalesArgument;
}

export class TimeRenderer extends AbstractRenderer<Date, ITimeRendererProps> {
    getFormatedText(): string {
        return this.value ? new Intl.DateTimeFormat(this.props.locale, defaultTimeRendererFormatOptions).format(this.value) : "";
    }
}
