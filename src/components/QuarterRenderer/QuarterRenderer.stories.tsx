import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { QuarterRenderer } from './QuarterRenderer';
import { RemoveKeyAttribute } from "../../../.storybook/utils";

const testdate = new Date("2024-10-06T19:40:55.221Z");

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const meta = {
  title: 'Components/QuarterRenderer',
  component: QuarterRenderer,
  argTypes: {
    value: {
      control: "date",
      description: "The **value** from which the quarter should be rendered.",
    },
    pure: {
      control: "boolean",
      description: "If **pure** is set/defined, then the component will render nothing but the 'pure' text representation of the value. Otherwise, the text representation is embeded within a *&lt;span&gt;&lt;/span&gt;* tag. (default: false/unset)",
    },
    displayYear: {
      control: "boolean",
      description: "Should the year corresponding to the Quarter number be displayed (e.g. '3/2026')? (default: false/unset)"
    },
  },
  parameters: {
    docs: {
      controls: { sort: "requiredFirst" },
      source: { language: 'tsx', type: 'auto', transform: RemoveKeyAttribute },
      description: { component: "The **QuarterRenderer** component displays the **Quarter number** corresponding to the input *value* of type `Date` (UTC). The displayed string is either pure or *spanned* i.e. enclosed by a *&lt;span&gt;&lt;/span&gt;* tag. Optionally, the year corresponding to the calculated Quarter number can be disaplyed as well (e.g. '2/2026')." },
    },
    layout: 'centered'
  },
  render: RenderQuarterRenderer
} satisfies Meta<typeof QuarterRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function RenderQuarterRenderer(args) {
  if (typeof args.value == 'number') args.value = new Date(args.value);
  return <QuarterRenderer key={Math.random()} {...args} />
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const Playground = {
  name: "Playground",
  args: {
    value: testdate,
    pure: false,
    displayYear: true
  },
  tags: ['!dev']
} satisfies Story;
