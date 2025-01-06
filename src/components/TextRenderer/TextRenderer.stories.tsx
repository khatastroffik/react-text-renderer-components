import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TextRenderer } from './TextRenderer';
import { RemoveKeyAttribute } from "../../../.storybook/utils";

const testtext = "some text";

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
      options: ["noop", "lowercase", "uppercase"],
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

function RenderTextRenderer(args) {
  return <TextRenderer key={Math.random()} {...args} />
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const Playground = {
  name: "Playground",
  args: {
    value: testtext,
    pure: true,
    transform: "noop"
  },
  tags: ['!dev']
} satisfies Story;
