import React from "react";
import { AbstractRenderer } from "./AbrstractRenderer";

class AbstractRendererWrapper extends AbstractRenderer {
    render() {
        return super.render();
    }
    getFormatedText() {
        return this.props.value;
    }
}

describe("AbstractRenderer component", () => {

    it("should render a pure text", () => {
        const component = new AbstractRendererWrapper({ value: "TEST", pure: true });
        expect(component).toBeTruthy();
        const abstractRendererElement: React.JSX.Element = component.render();
        expect(abstractRendererElement).toBeTruthy();
        const fragmentElement = <></>;
        expect(abstractRendererElement['$$typeof']).toBe(fragmentElement['$$typeof']);
    });

    it("should render a spanned text", () => {
        const component = new AbstractRendererWrapper({ value: "TEST" });
        expect(component).toBeTruthy();
        const abstractRendererElement: React.JSX.Element = component.render();
        expect(abstractRendererElement).toBeTruthy();
        const spanElement: React.ReactElement = <span />;
        expect(abstractRendererElement['$$typeof']).toBe(spanElement['$$typeof']);
    });

});