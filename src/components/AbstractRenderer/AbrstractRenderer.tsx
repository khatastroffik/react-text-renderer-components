import React from 'react';

export type ModifyValueType<T, R> = Omit<T, keyof R> & R;

export interface IAbstractRendererProps {
    value: unknown;
    pure?: boolean;
}

export interface IDateValue { value: Date }
export interface ITextValue { value: string }

export abstract class AbstractRenderer<IRendererValueType = string, IRendererProps extends IAbstractRendererProps = IAbstractRendererProps> extends React.Component<IRendererProps> {

    value: IRendererValueType;
    pure: boolean;

    constructor(props: IRendererProps) {
        super(props);
        this.value = this.props.value as IRendererValueType;
        this.pure = !!this.props["pure"];
    }

    protected abstract getFormatedText(): string;

    render() {
        const textToDisplay = this.getFormatedText();
        if (this.pure) {
            return (<>{textToDisplay}</>)
        }
        return (<span>{textToDisplay}</span>);
    }
}
