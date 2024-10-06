# react-text-renderer-components

This is zero-dependencies component library providing (pure) text rendering for common and custom data/field types.

## Available renderer components

- `DateRenderer` component

## Features

- typesafe handling of input values
- automatic text formating per dedicated functions within the given react components
- render formated text as-is i.e. as "pure" text or
- render formated text within a &lt;span&gt; tag i.e. as "spanned" text
- easily implement *your own Renderer variants* (see below)

## Usage

### DateRenderer

- component properties:  
`value: Date`, `pure: boolean`, `locale: Intl.LocalesArgument`

- examples:
    ```
    <DateRenderer value={new Date()} />
    <DateRenderer value={new Date()} pure />
    <DateRenderer value={new Date()} pure={isPureDisplay} />
    <DateRenderer value={new Date()} pure locale="Fr-fr" />
    ```

## ToDo

### Implement supplemental renderer components

- `TimeRenderer` component
- `DateTimeRenderer` component
- `CalendarWeekRenderer` component
- `TextRenderer` component (with text manipulation like UpperCase, LowerCase, Replace...)
- `CurrencyRenderer` component
- `CustomRenderer` component i.e the text formating function

TBD: implement `Date` type related component in a UTC variant?

### Add "common" features  to the AbstractRenderer

- support `Tooltip` property
- support `className` property - for spanned text
- support `style`property - for spanned text
- support `ellipsis` css formating - for spanned text
- support `Aria` related properties - for spanned text

## How to implement your own "renderer variants"?

 it is very easy to implement new classes derived from the `AbstractRenderer` class:
 
 - such derived classes just need to provide an implementation of the abstract `getFormatedText(): string` method.
 - Optionally, the type of the input `value` property (default to string) can be set/defined using a simplistic interface declaration.
 - Furthermore, you may define additional properties for the derived react component.

 Please find some stylized examples below.

  ### overriding the formating function

 a class as simple as:
 ```javascript
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
 Gentle-Breakdown
 <span>n/a</span>
 ```

### defining a custom type for the input value property

in order to define a specific/custom type for the `value` passed to the renderer as a prop, use the following approach:

```javascript
import { AbstractRenderer, IAbstractRendererProps, ModifyValueType } from "./AbstractRenderer";

export interface Person {
    name: string;
    email: number;
}

export type IPersonRendererProps = ModifyValueType<IAbstractRendererProps, { value: Person }>;

export class PersonRenderer extends AbstractRenderer<Person, IPersonRendererProps> {
    protected getFormatedText(): string {
        return this.value ? `${this.value.name} (${this.value.email})` : "";
    }
}
```

### Add properties to the renderer class

To enhance the properties of the renderer class i.e to add properties to be passed to the renderer, do apply this technic:

```javascript
export interface IIconizedRendererProps extends IAbstractRendererProps {
    iconName: string;
}

export class IconizedRenderer extends AbstractRenderer<string, IIconizedRendererProps> {
    protected getFormatedText(): string {
        return this.value ? `${this.value.name} (${this.value.email})` : "";
    }
}
```

### Add properties and modify the type of the input value property

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

## Jest & Testing

```shell
npm install -D jest @testing-library/react ts-jest @types/jest ts-node @testing-library/jest-dom jest-environment-jsdom @testing-library/user-event
```

## Some sources of inspiration

- https://jestjs.io/docs/tutorial-react
- https://dev.to/teyim/effortless-testing-setup-for-react-with-vite-typescript-jest-and-react-testing-library-1c48
- https://www.pluralsight.com/resources/blog/guides/how-to-test-react-components-in-typescript
- https://www.pluralsight.com/resources/blog/guides/how-to-return-plain-text-from-a-react-component

