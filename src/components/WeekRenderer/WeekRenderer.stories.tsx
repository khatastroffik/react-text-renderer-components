import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { WeekRenderer } from './WeekRenderer';
import { numberingSystemLabels, numberingSystemMappings, numberingSystemOptions, RemoveKeyAttribute } from "../../../.storybook/utils";

const testdate = new Date("2024-10-06T19:40:55.221Z");

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const meta = {
  title: 'Components/WeekRenderer',
  component: WeekRenderer,
  argTypes: {
    value: {
      control: "date",
      description: "The **value** from which the *date* part should be rendered.",
    },
    pure: {
      control: "boolean",
      description: "If **pure** is set/defined, then the component will render nothing but the 'pure' text representation of the value. Otherwise, the text representation is embeded within a *&lt;span&gt;&lt;/span&gt;* tag. (default: false/unset)",
    },
    minimumIntegerDigits: {
      control: { type: "range", min: 1, max: 2, step: 1 },
      description: "this parameter defines the amount of displayed digits (1 or 2) for the week number when the value is < 10. (default: 2 digits).",
      defaultValue: undefined
    },
    displayYear: {
      control: "boolean",
      description: "Should the year corresponding to the week number be displayed (e.g. '53/2026')? (default: false/unset)"
    },
    numberingSystem: {
      control: { type: "select", labels: numberingSystemLabels },
      description: "this parameter defines the 'design' of the displayed digits. (default: unset → client numbering system)",
      options: numberingSystemOptions,
      mapping: numberingSystemMappings
    }
  },
  parameters: {
    docs: {
      controls: { sort: "requiredFirst" },
      source: { language: 'tsx', type: 'auto', transform: RemoveKeyAttribute },
      description: { component: "The **WeekRenderer** component displays the **ISO-week number** corresponding to the input *value* of type `Date`. The displayed string is either pure or *spanned* i.e. enclosed by a *&lt;span&gt;&lt;/span&gt;* tag. Optionally, the year corresponding to the calculated week number can be disaplyed as well (e.g. '53/2026')." },
    },
    layout: 'centered'
  },
  render: RenderWeekRenderer
} satisfies Meta<typeof WeekRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function RenderWeekRenderer(args) {
  if (typeof args.value == 'number') args.value = new Date(args.value);
  return <WeekRenderer key={Math.random()} {...args} />
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const Playground = {
  name: "Playground",
  args: {
    value: testdate,
    pure: false,
    displayYear: false
  },
  tags: ['!dev']
} satisfies Story;
