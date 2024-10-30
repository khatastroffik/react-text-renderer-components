import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DateRenderer } from './DateRenderer';
import { RemoveKeyAttribute } from "../../../.storybook/utils";

const testdate = new Date("2024-10-06T19:40:55.221Z");

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const meta = {
  title: 'Components/DateRenderer',
  component: DateRenderer,
  argTypes: {
    value: {
      control: "date",
      description: "The **value** from which the *date* part should be rendered.",
    },
    pure: {
      control: "boolean",
      description: "If **pure** is set/defined, then the component will render nothing but the 'pure' text representation of the value. Otherwise, the text representation is embeded within a *&lt;span&gt;&lt;/span&gt;* tag.",
    },
    locale: {
      control: "select",
      description: "**locale** is used to format the date to a localized string. By default, this property is not defined/set and the DateRenderer component uses the system setting.",
      options: ["en-EN", "de-DE", "fr-FR", "it-IT", "ja-JP"],
    }
  },
  parameters: {
    docs: {
      controls: { sort: "requiredFirst" },
      source: { language: 'tsx', type: 'auto', transform: RemoveKeyAttribute },
      description: { component: "The **DateRenderer** component renders an input *value* of type `Date` to a pure/spanned, localized string representation of the **date part** of the *value*." },
    },
    layout: 'centered'
  },
  render: RenderDateRenderer
} satisfies Meta<typeof DateRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function RenderDateRenderer(args) {
  if (typeof args.value == 'number') args.value = new Date(args.value); 
  return <DateRenderer key={Math.random()} {...args} />
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const Playground = {
  name: "Playground",
  args: {
    value: testdate, 
    pure: false,
    locale: undefined
  },
  tags: ['!dev']
} satisfies Story;
