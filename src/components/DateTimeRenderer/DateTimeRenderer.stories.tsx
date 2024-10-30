import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DateTimeRenderer } from './DateTimeRenderer';
import { RemoveKeyAttribute } from "../../../.storybook/utils";

const testdate = new Date("2024-10-06T19:40:55.221Z");

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const meta = {
  title: 'Components/DateTimeRenderer',
  component: DateTimeRenderer,
  argTypes: {
    value: {
      control: "date",
      description: "The **value** from which the *date* part should be rendered.",
    },
    formatOptions: {
      control: "object", // "Intl.DateTimeFormatOptions",
      description: "The (optional) **format options** is used to shape the displayed date and time parts.",
    },
    pure: {
      control: "boolean",
      description: "If **pure** is set/defined, then the component will render nothing but the 'pure' text representation of the value. Otherwise, the text representation is embeded within a *&lt;span&gt;&lt;/span&gt;* tag.",
    },
    locale: {
      control: "select",
      description: "**locale** is used to format the date to a localized string. By default, this property is not defined/set and the DateTimeRenderer component uses the system setting.",
      options: ["en-EN", "de-DE", "fr-FR", "it-IT", "ja-JP"],
    }
  },
  parameters: {
    docs: {
      controls: { sort: "requiredFirst" },
      source: { language: 'tsx', type: 'auto', transform: RemoveKeyAttribute },
      description: { component: "The **DateTimeRenderer** component renders an input *value* of type `Date` to a pure/spanned, localized string representation showing both the **date and time parts** of the *value*." },
    },
    layout: 'centered'
  },
  render: RenderDateTimeRenderer
} satisfies Meta<typeof DateTimeRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function RenderDateTimeRenderer(args) {
  if (typeof args.value == 'number') args.value = new Date(args.value);
  return <DateTimeRenderer key={Math.random()} {...args} />
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const Playground = {
  name: "Playground",
  args: {
    value: testdate,
    pure: true,
    locale: undefined,
    formatOptions: { dateStyle: "full", timeStyle: "short", timeZone: "Australia/Sydney", hour12: true, calendar: "persian" }
  },
  tags: ['!dev']
} satisfies Story;
