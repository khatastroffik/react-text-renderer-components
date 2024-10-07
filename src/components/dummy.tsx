import React from 'react';

export class Dummy extends React.Component {
    render() {
        return (<>Dummy</>)
    }
}


// import { AbstractRenderer, IAbstractRendererProps, ModifyValueType } from "./AbstractRenderer";

// export interface Person {
//     name: string;
//     email: number;
// }

// export type IPersonRendererProps = ModifyValueType<IAbstractRendererProps, { value: Person }>;

// export class DummyRenderer extends AbstractRenderer<Person, IPersonRendererProps> {
//     protected getFormatedText(): string {
//         return this.value ? `${this.value.name}<${this.value.email}>` : "";
//     }
// }

