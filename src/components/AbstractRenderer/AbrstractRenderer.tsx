import React from 'react';

export type ModifyValueType<T, R> = Omit<T, keyof R> & R;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IRendererValueType = any;

export interface IAbstractRendererProps {
    value: IRendererValueType;
    pure?: boolean;
}

export abstract class AbstractRenderer<IRendererValueType = string, IRendererProps extends IAbstractRendererProps = IAbstractRendererProps> extends React.Component<IRendererProps> {

    value: IRendererValueType;
    pure: boolean;

    constructor(props: IRendererProps) {
        super(props);
        this.value = this.props.value
        this.pure = this.props["pure"] ?? false;
    }

    protected abstract getFormatedText(): string;

    render() {
        const textToDisplay = this.getFormatedText();
        if (this.pure) {
            return (<>{textToDisplay}</>)
        } else
            return (<span>{textToDisplay}</span>);
    }
}