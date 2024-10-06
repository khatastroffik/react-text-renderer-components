import { AbstractRenderer, IAbstractRendererProps, ModifyValueType } from "../AbstractRenderer";

interface DateRendererValue {
    value: Date;
}

export interface IDateRendererProps extends ModifyValueType<IAbstractRendererProps, DateRendererValue> {
    locale?: Intl.LocalesArgument
}

export class DateRenderer extends AbstractRenderer<Date, IDateRendererProps> {
    protected getFormatedText(): string {
        return this.value ? this.value.toLocaleDateString(this.props.locale) : "";
    }
}