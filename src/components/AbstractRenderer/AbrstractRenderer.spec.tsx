import React from "react";
import { AbstractRenderer } from "./AbrstractRenderer";
import { render, screen } from '@testing-library/react';

class AbstractRendererWrapper extends AbstractRenderer {
    getFormatedText(): string {
        return this.props.value as string;
    }
}

describe("AbstractRenderer component", () => {
    
    it("should render a pure text", () => {
        render(<AbstractRendererWrapper value="TEST" pure />);
        const e = screen.getByText("TEST");
        expect(e).toBeInTheDocument();
        expect(e.tagName).not.toEqual("SPAN");
        expect(e.tagName).toEqual("DIV");
        expect(e).toHaveTextContent("TEST");
    });

    it("should NOT render a pure text", () => {
        render(<AbstractRendererWrapper value="TEST" pure={false} />);
        const e = screen.getByText("TEST");
        expect(e).toBeInTheDocument();
        expect(e.tagName).toEqual("SPAN");
        expect(e).toHaveTextContent("TEST");
    });

    it("should render a spanned text", () => {
        render(<AbstractRendererWrapper value="TEST" />);
        const e = screen.getByText("TEST");
        expect(e).toBeInTheDocument();
        expect(e.tagName).toEqual("SPAN");
        expect(e).toHaveTextContent("TEST");
    });

});
