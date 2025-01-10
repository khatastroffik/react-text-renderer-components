import React, { Component, ReactNode } from "react";
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { ITextRendererProps, TextRenderer, TextTransformations } from './TextRenderer';
import { RemoveKeyAttribute } from "../../../.storybook/utils";

const testtext = "fancy-TEXT with_Unicode CharPoints Ā𐀀文🦄";
// BASE64 = ZmFuY3ktVEVYVCB3aXRoX1VuaWNvZGUgQ2hhclBvaW50cyDEgPCQgIDmlofwn6aE

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const meta = {
    title: 'Components/TextRenderer',
    component: TextRenderer,
    argTypes: {
        value: {
            control: "text",
            description: "The text **value** (string) which should be transformed and rendered.",
        },
        pure: {
            control: "boolean",
            description: "If **pure** is set/defined, then the component will render nothing but the 'pure' text representation of the value. Otherwise, the text representation is embeded within a *&lt;span&gt;&lt;/span&gt;* tag.",
        },
        transform: {
            control: "select",
            description: "The type of transformation to be applied to the input values.",
            options: TextTransformations,
        }
    },
    parameters: {
        docs: {
            controls: { sort: "requiredFirst" },
            source: { language: 'tsx', type: 'auto', transform: RemoveKeyAttribute },
            description: { component: "The **TextRenderer** component renders an input *value* of type `string` to a pure/spanned representation showing the transformed text as defined by the `transform` attribute of the component." },
        },
        layout: 'centered'
    },
    render: RenderTextRenderer
} satisfies Meta<typeof TextRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

interface ErrorBoundaryProps { children?: ReactNode; fallback: () => void; }
interface ErrorState { hasError: boolean; error?: Error; }

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorState> {

    state: ErrorState = { hasError: false, error: null };

    constructor(props) {
        super(props);
    }

    static getDerivedStateFromError(error: Error): ErrorState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error) {
        console.error(`[CAPTURED] ${error.name}: ${error.message}`);
    }

    render() {
        if (this.state.hasError) {
            return (<>
                <style>{`.errordisplay { padding: 15px; text-align: center; }`}</style>
                <div className='errordisplay' >
                    <h2>{this.state.error.name ?? "UNKNOWN ERROR"}</h2>
                    <h3>{this.state.error.message ?? "(no description available)"}</h3>
                    <button onClick={() => this.props.fallback()}>reload this component</button>
                </div>
            </>);
        } else {
            return this.props.children;
        }
    }
}

function RenderTextRenderer(args: ITextRendererProps) {
    const [, , resetArgs] = useArgs<ITextRendererProps>();
    const key = Math.random();
    return (
        <ErrorBoundary key={key} fallback={resetArgs}>
            <TextRenderer key={key} {...args} />
        </ErrorBoundary>
    );
}



// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const Playground = {
    name: "Playground",
    args: {
        value: testtext,
        pure: true,
        transform: "no-op"
    },
    tags: ['!dev']
} satisfies Story;
