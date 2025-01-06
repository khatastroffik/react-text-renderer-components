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

    it("should render an empty string when value is null", () => {
        const r = render(<AbstractRendererWrapper value={null} pure />);
        expect(r.container.innerHTML).toEqual("");
    });

    it("should render an empty string when value is undefined", () => {
        const r = render(<AbstractRendererWrapper value={undefined} pure />);
        expect(r.container.innerHTML).toEqual("");
    });

    it("should render a spanned empty string when value is null", () => {
        const r = render(<AbstractRendererWrapper value={null} />);
        expect(r.container.innerHTML).toEqual("<span></span>");
    });

    it("should render a spanned string when value is undefined", () => {
        const r = render(<AbstractRendererWrapper value={undefined} />);
        expect(r.container.innerHTML).toEqual("<span></span>");
    });

    it("should render a spanned text when the 'pure' attribute is ommited", () => {
        render(<AbstractRendererWrapper value="TEST" />);
        const e = screen.getByText("TEST");
        expect(e).toBeInTheDocument();
        expect(e.tagName).toEqual("SPAN");
        expect(e).toHaveTextContent("TEST");
    });

    it("should render a spanned text when the 'pure' attribute is null", () => {
        render(<AbstractRendererWrapper value="TEST" pure={null} />);
        const e = screen.getByText("TEST");
        expect(e).toBeInTheDocument();
        expect(e.tagName).toEqual("SPAN");
        expect(e).toHaveTextContent("TEST");
    });

});
