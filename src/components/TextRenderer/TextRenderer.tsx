import { AbstractRenderer, IAbstractRendererProps, ITextValue, ModifyValueType } from "../AbstractRenderer";

export const TextTransformations = ["no-op", "lower-case", "upper-case", "snake-case", "pascal-case", "camel-case", "kebab-case", "to-base64", "from-base64", "camel-to-kebab", "pascal-to-kebab"] as const;
export type TextRendererTransformation = typeof TextTransformations[number];
export interface ITextRendererProps extends ModifyValueType<IAbstractRendererProps, ITextValue> { transform: TextRendererTransformation }

const INVALID_CHARACTER_ERROR = "InvalidCharacterError";
const INVALID_UTF16_ERROR_MSG = "The input value is not well formed: it is not a valid UTF-16 string, since it contains lone surrogates.";
const INVALID_BASE64_ERROR_MSG = "The input value is not a valid BASE64 string and cannot be decoded.";
const TransformationRegex = /([a-zA-Z0-9]+)(?=)/g;
const Base64ValidityRegex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

export class TextRenderer extends AbstractRenderer<string, ITextRendererProps> {

    protected getFormatedText(): string {
        const sourceText = this.value ?? "";
        switch (this.props.transform ?? "noop") {
            case 'lower-case':
                return sourceText.toLowerCase();
            case 'upper-case':
                return sourceText.toUpperCase();
            case 'noop':
                return sourceText;
            case 'snake-case':
                return this.snakeCase(sourceText);
            case 'pascal-case':
                return this.pascalCase(sourceText);
            case 'camel-case':
                return this.camelCase(sourceText);
            case 'kebab-case':
                return this.kebabCase(sourceText);
            case 'to-base64':
                return this.toBase64(sourceText);
            case 'from-base64':
                return this.fromBase64(sourceText);
            case 'camel-to-kebab':
            case 'pascal-to-kebab':
                return this.boundedTextToKebabCase(sourceText);
            default:
                return sourceText;
        }
    }

    private snakeCase(text: string): string {
        return text.match(TransformationRegex).join("_");
    }

    private camelCase(text: string): string {
        return text.match(TransformationRegex).map((match: string, index: number) => ((index > 0) ? match[0].toUpperCase() : match[0].toLowerCase()) + match.slice(1).toLowerCase()).join("");
    }

    private pascalCase(text: string): string {
        return text.match(TransformationRegex).map((match: string) => match[0].toUpperCase() + match.slice(1).toLowerCase()).join("");
    }

    private kebabCase(text: string): string {
        return text.match(TransformationRegex).join("-").toLowerCase();
    }

    private boundedTextToKebabCase(text: string): string {
        return text.replace(/(?<!^)[A-Z]/g, (match) => "-" + match).toLowerCase();
    }

    private toBase64(text: string): string {
        if (!text.isWellFormed()) {
            throw new DOMException(INVALID_UTF16_ERROR_MSG, INVALID_CHARACTER_ERROR);
        }
        const bytes: Uint8Array = new TextEncoder().encode(text);
        const binString: string = Array.from(bytes, (byte) => String.fromCodePoint(byte),).join("");
        return btoa(binString);
    }

    private fromBase64(base64: string): string {
        if (!Base64ValidityRegex.test(base64)) {
            throw new DOMException(INVALID_BASE64_ERROR_MSG, INVALID_CHARACTER_ERROR);
        }
        const binString: string = atob(base64);
        const bytes: Uint8Array = Uint8Array.from(binString, (m) => m.codePointAt(0));
        return new TextDecoder().decode(bytes);
    }

}
