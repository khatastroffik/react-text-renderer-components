# react-text-renderer-components

! MANAGE AND RENDER YOUR DATA, NOT THEIR STRING REPRESENTATION !

This is a zero-dependencies component library providing a set of (pure) text rendering utility components. Those components are accepting common and custom data/field types as input and are rendering their text representation *automatically*.

e.g. to render the text corresponding to a `DateOfBirth` field (Date type) within an html-table cell, use a simple `<td><DateRenderer value={person.DateOfBirth} /></td>` statement.

## Available renderer components

- `DateRenderer` component
- `TimeRenderer` component
- `DateTimeRenderer` component

more components to come... (see the ToDos below)

## Features

- typesafe handling of input values = use your own input value types!
- text formating is implemented within the text-renderer react components
- (automatic) rendering of Date, Time and DateTime (w/ optional custom format) *localized* text representations
- render formated text as-is i.e. as "*pure*" text (e.g.  `new Date("06.10.2024")` rendered as `06.10.2024`) or
- render formated text within a `<span></span>` tag (e.g. `new Date("06.10.2024")` rendered as `<span>06.10.2024</span>`)
- implement *your own (reusable) Text Renderer components* easily (see below)
- efficient and type safe formating of *Date* values using the `Intl.DateTimeFormat(..)` (see "Notes on formating DateTime values" below)
- define once, reuse everywhere
- use the CustomRenderer component to render any type of data using a simple 'mutation' function of your own (not implemented yet).

more features to come (see the ToDos below)

## API and Usage (overview)

### DateRenderer

- component properties (API):  
    ```javascript
    {   
        value: Date
        pure: boolean // optional
        locale: Intl.LocalesArgument // optional
    }
    ```

- usage examples:
    ```jsx
    <DateRenderer value={new Date()} />
    <DateRenderer value={new Date()} pure />
    <DateRenderer value={new Date()} pure={isPureDisplay} />
    <DateRenderer value={new Date()} pure locale="fr-Fr" />
    ```

- note:  
this function is rendering a date using a "*medium*" date style format option. Alternative: use the `DateTimeRenderer` component, which is allowing to define and use custom format options.

### TimeRenderer

- component properties (API):
    ```javascript
    {   
        value: Date
        pure: boolean // optional
        locale: Intl.LocalesArgument // optional
    }
    ```

- usage examples:
    ```jsx
    <TimeRenderer value={new Date()} />
    <TimeRenderer value={new Date()} pure />
    <TimeRenderer value={new Date()} pure={isPureDisplay} />
    <TimeRenderer value={new Date()} pure locale="fr-Fr" />
    ```

- note:  
this function is rendering a date using a "*medium*" time style format option. Alternative: use the `DateTimeRenderer` component, which is allowing to define and use custom format options.

### DateTimeRenderer

- component properties (API):
    ```javascript
    {   
        value: Date
        pure: boolean // optional
        locale: Intl.LocalesArgument // optional
        formatOptions: Intl.DateTimeFormatOptions // optional
    }
    ```

- usage examples:
    ```jsx
    <DateTimeRenderer value={new Date()} />
    <DateTimeRenderer value={new Date()} pure />
    <DateTimeRenderer value={new Date()} formatOptions={ { dateStyle: "long", timeStyle: "short" } }  locale="en-US" />
    <DateTimeRenderer value={new Date()} formatOptions={ { dateStyle: "full", timeStyle: "short", timeZone: "Australia/Sydney", hour12: true, calendar: "persian" } }  locale="it-IT" />
    <DateTimeRenderer value={new Date()} pure locale="fr-Fr" />
    ```
- note:  
this function is rendering a 'date + time' using a "*short*" date + "*short*" time style format options. Alternative: use the `formatOptions` property of this component in order to define and use custom format options.

## Installation

The package containing the Text Renderer Components will be available for installation using *either* the [NPM package registry](https://www.npmjs.com/search?q=react-text-renderer-components) *or* the Github Packages as registered directly within the Github repository of the library.

### install from the "npm registry"

You may use any package manager cli such as "npm" or "yarn" in order to download and install the library in your project.

1. From the root folder of your project (containing the `package.json` file of the project), run the following command within any suitable shell (powershell, bash...):

    ```shell
    npm install react-text-renderer-components

    # or 

    yarn install react-text-renderer-components
    ```
1. import any component you'd like to use and insert the corresponding tag and options into your rendering procedure:
    ```jsx
    import { DateRenderer } from '@khatastroffik/react-text-renderer-components';

    export const Today = () => {
        return <DateRenderer value={new Date()} />
    }
    ```

That's it!

<!-- #### install the "Github Package" from the github repository of the library -->

## Tech Stack

- parcel, react, typeScript
- tsc, jest, eslint, husky, lint-staged, rimraf, storybook
- class inheritance, modification of the type of an inherited react component property, DRY, SoC, localization, injection
- commit message guideline, semantic versioning, test coverage
- github pages, github packages, npm package registry

**Note:** *The "class inheritance" is intentionally used here*!

This design allows to avoid repetitions, reduce the size of the compiled code using this library, ease maintenance of the components. It also simplify type checking (potentially complex) data/value types and separate the user interface from the "business logic" of the different renderer classes etc. It also permit to validate/sanitize/escape the rendered text centraly, regardless of the implemented Text Renderer classes.

## ToDo list

### Implement supplemental renderer components

- [ ] `CalendarWeekRenderer` component
- [ ] `QuarterRenderer` component
- [ ] `TextRenderer` component (with text manipulation like UpperCase, LowerCase, Replace...)
- [ ] `CurrencyRenderer` component
- [ ] `CustomRenderer` component i.e the text formating function may be provided from the parent application/component using the CustomRenderer.

### Add "common" features to the AbstractRenderer

- [ ] `Tooltip` property
- [ ] `className` property - for spanned text
- [ ] `style`property - for spanned text
- [ ] `ellipsis` css formating - for spanned text
- [ ] `Aria` related properties - for spanned text
- [ ] Validate and sanitize/escape the generated/formated stringc prior rendition for Custom Text Renderer classes.

### project enhancements

- [ ] migrate this todo list to the github issues
- [x] add storybook stories for each component
- [x] add a github action in order to deploy the package to npm
- [x] add a github action in order to deploy the package as github package within the repository
- [x] add a github action in order to build and publish the storybook static page as github page of the repository
- [x] provide an example for implementing custom components derived from the AbstractRenderer component

## How to implement your own, custom "renderer" using this library?

it is very easy to implement new classes derived from the `AbstractRenderer` class:
 
- such derived classes just need to provide an implementation of the abstract `getFormatedText(): string` method.
- Optionally, the type of the input `value` property (default to string) can be set/defined using a simplistic interface declaration.
- Furthermore, you may define additional properties for the derived react component.

Please find some stylized use cases below.

### use case #1: create a component using your own "text formating" functionality

A class as simple as:

```tsx
export class SpecialRenderer extends AbstractRenderer {
    protected getFormatedText(): string {       
        return this.value ? `&rArr; ${this.value} &lArr;` : "n/a";
    }
}
 ```

may be used per

 ```html
 <SpecialRenderer value="Dramatic-Weasel" />
 <SpecialRenderer value="Gentle-Breakdown" pure />
 <SpecialRenderer value="" />
 ```

 and would output

 ```html
 <span>&rArr; Dramatic-Weasel &lArr;</span>
 &rArr; Gentle-Breakdown &lArr;
 <span>n/a</span>
 ```

### use case #2: defining a custom type for the input value property

in order to define a specific/custom type for the `value` passed to the renderer as a react component property, use the following approach:

```typescript
import { AbstractRenderer, IAbstractRendererProps, ModifyValueType } from "./AbstractRenderer";

// 1) define your custom data type
export interface Person {
    name: string;
    email: number;
}

// 2) override the default (string) type of the "value" property defined within the AbstractRenderer
export type IPersonRendererProps = ModifyValueType<IAbstractRendererProps, { value: Person }>;

// 3) define a custom rendere class using the specific data type and the custom property type as defined above
export class PersonRenderer extends AbstractRenderer<Person, IPersonRendererProps> {
    protected getFormatedText(): string {
        return this.value ? `${this.value.name} (${this.value.email})` : "";
    }
}
```

### use case #3: Add properties to the renderer class

To enhance the properties of the renderer class i.e to add properties to be passed to the renderer, do apply this technic:

```typescript
export interface IIconizedRendererProps extends IAbstractRendererProps {
    iconName: string;
}

export class IconizedRenderer extends AbstractRenderer<string, IIconizedRendererProps> {
    protected getFormatedText(): string {
        return this.value ? `${this.value.name} (${this.value.email})` : "";
    }
}
```

### use case #4: Add properties and modify the type of the input value property

you may also like to combine both modifications i.e. overriding the value type definition and adding properties...

```javascript

export interface ISpecialValueType {
    timestamp: Date;
    data: Array<{ foo: string, baz: string };
}

export interface ISpecialRendererProps extends ModifyValueType<IAbstractRendererProps, { value: ISpecialValueType }> {
    additionalReactComponentProperty: string;
}

export class VerySpecialRenderer extends AbstractRenderer<ISpecialValueType, ISpecialRendererProps> {
    protected getFormatedText(): string {
        // use `this.props.additionalReactComponentProperty` wherever needed
        // use 'this.value' of type 'ISpecialValueType' e.g. 'this.value.timestamp' or 'this.value.data.length' etc.
        return "Tremendous! Unglaublich! Formidable! Khatastroffik!";
    }
}

```

## Notes on formating DateTime values

A standard approach consists in calling one of the formating methodes of the `Date` class, such as `toLocaleString(...)` and similar.

There's a **drawback** of using this approach when dealing with large amount of data i.e. of to-be-formated date values, as stated in the [MSDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) documentation:

> Every time toLocaleString is called, it has to perform a search in a big database of localization strings, which is *potentially inefficient*. When the method is called many times with the same arguments, it is better to create a Intl.DateTimeFormat object and use its format() method, because a DateTimeFormat object remembers the arguments passed to it and may decide to cache a slice of the database, so future format calls can search for localization strings within a more constrained context.

Hence, this library is using the `DateTimeFormat` object and its `format()`method to generate localized and formated output according to the component properties as per:

- `DateRenderer` is using a `{ dateStyle: "medium" }` format and the optionally provided `locale` property (fallback to system locale if missing). The Output is similar to `06.10.2024` or `10/06/2024` (depending on the locale).

- `TimeRenderer` is using a `{ timeStyle: "medium" }` format and the optionally provided `locale` property (fallback to system locale if missing). The Output is similar to `19:25:55` or `7:25:55 PM` (depending on the locale).

- `DateTimeRenderer` is using a `{ dateStyle: "short", timeStyle: "short" }` format and the optionally provided `locale` property (fallback to system locale if missing). The Output isdisplaying both the date and time part and is similar to `07.10.24, 19:25` or `10/7/24, 7:25 PM` (depending on the locale).

## Jest & Testing

```shell
npm install -D jest @testing-library/react ts-jest @types/jest ts-node @testing-library/jest-dom jest-environment-jsdom @testing-library/user-event
```

## Some sources of inspiration

### Tests

- https://jestjs.io/docs/tutorial-react
- https://dev.to/teyim/effortless-testing-setup-for-react-with-vite-typescript-jest-and-react-testing-library-1c48
- https://www.pluralsight.com/resources/blog/guides/how-to-test-react-components-in-typescript

### Storybook

- https://storybook.js.org/addons/@storybook/addon-docs
- https://github.com/storybookjs/storybook/blob/master/addons/docs/docs/mdx.md
- https://storybook.js.org/docs/writing-docs/autodocs#customize-the-docs-container
- https://storybook.js.org/docs/api/doc-blocks/doc-block-useof

- https://storybook.js.org/addons/@whitespace/storybook-addon-html
- https://storybook.js.org/addons/storybook-addon-storyout
- https://storybook.js.org/addons/@storybook/addon-console

### Divers

- https://www.pluralsight.com/resources/blog/guides/how-to-return-plain-text-from-a-react-component
- https://www.30secondsofcode.org/js/s/day-week-month-quarter-of-year/

