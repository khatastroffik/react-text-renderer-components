import { AbstractRenderer, IAbstractRendererProps, ITextValue, ModifyValueType } from "../AbstractRenderer";

export type TextRendererTransformation = "noop" | "lowercase" | "uppercase";
export interface ITextRendererProps extends ModifyValueType<IAbstractRendererProps, ITextValue> {
    transform: TextRendererTransformation
}

export class TextRenderer extends AbstractRenderer<string, ITextRendererProps> {
    protected getFormatedText(): string {
        const sourceText = this.value ?? "";
        switch (this.props.transform ?? "noop") {
            case 'lowercase':
                return sourceText.toLowerCase();
                break;
            case 'uppercase':
                return sourceText.toUpperCase();
                break;
            case 'noop':
                return sourceText;
                break;
            default:
                return sourceText;
                break;
        }        
    }
}
