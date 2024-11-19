import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TimeRenderer } from './TimeRenderer';
import { RemoveKeyAttribute, timeZoneLabels, timeZoneMappings, timeZoneOptions } from "../../../.storybook/utils";

const testdate = new Date("2024-10-06T19:40:55.221Z");

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const meta = {
  title: 'Components/TimeRenderer',
  component: TimeRenderer,
  argTypes: {
    value: {
      control: "date",
      description: "The **value** from which the *time* part should be rendered (note: the Storybook control is automatically *localized* using the client system locale).",
    },
    pure: {
      control: "boolean",
      description: "If **pure** is set/defined, then the component will render nothing but the 'pure' text representation of the value. Otherwise, the text representation is embeded within a *&lt;span&gt;&lt;/span&gt;* tag.",
    },
    locale: {
      control: "select",
      description: "**locale** is used to format the date to a localized string. By default, this property is not defined/set and the TimeRenderer component uses the system setting.",
      options: ["en-EN", "de-DE", "fr-FR", "it-IT", "ja-JP"],
    },
    timeZone: {
      control: { type: "select", labels: timeZoneLabels, },
      description: "**timeZone** is used to calculate the UTC date for a given timeZone. By default, this property is not defined/set and the TimeRenderer component uses the system setting.",
      options: timeZoneOptions,
      mapping: timeZoneMappings
    }
  },
  parameters: {
    docs: {
      controls: { sort: "requiredFirst" },
      source: { language: 'tsx', type: 'auto', transform: RemoveKeyAttribute },
      description: { component: "The **TimeRenderer** component renders an input *value* of type `Date` to a pure/spanned, localized string representation of the **time part** of the *value*." },
    },
    layout: 'centered'
  },
  render: RenderTimeRenderer
} satisfies Meta<typeof TimeRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function RenderTimeRenderer(args) {
  if (typeof args.value == 'number') args.value = new Date(args.value);
  return <TimeRenderer key={Math.random()} {...args} />
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
