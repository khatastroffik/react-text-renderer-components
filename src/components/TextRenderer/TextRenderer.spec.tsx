import React from "react";
import { render } from '@testing-library/react';
import { TextRenderer } from "./TextRenderer";

describe("TextRenderer component", () => {

    it("should render a text value to lowercase", () => {
        const sourceText = "SOURCE TEXT";
        const r = render(<TextRenderer value={sourceText} transform="lowercase" pure />);
        expect(r.container.innerHTML).toEqual(sourceText.toLowerCase());
    });

    it("should render a spanned, lowercased text", () => {
        const sourceText = "SOURCE TEXT";
        const r = render(<TextRenderer value={sourceText} transform="lowercase" />);
        expect(r.container.innerHTML).toEqual(`<span>${sourceText.toLowerCase()}</span>`);
    });

    it("should render a text value to uppercase", () => {
        const sourceText = "source text";
        const r = render(<TextRenderer value={sourceText} transform="uppercase" pure />);
        expect(r.container.innerHTML).toEqual(sourceText.toUpperCase());
    });

    it("should render an empty text when value is undefined", () => {
        const sourceText = undefined;
        const r = render(<TextRenderer value={sourceText} transform="noop" pure />);
        expect(r.container.innerHTML).toEqual("");
    });

    it("should render an empty text when value is null", () => {
        const sourceText = null;
        const r = render(<TextRenderer value={sourceText} transform="noop" pure />);
        expect(r.container.innerHTML).toEqual("");
    });

    it("should render an umodified text value when transformation is 'noop' (no-operation)", () => {
        const sourceText = "SOURCE text";
        const r = render(<TextRenderer value={sourceText} transform="noop" pure />);
        expect(r.container.innerHTML).toEqual(sourceText);
    });

    it("should render an umodified text value when transformation is null", () => {
        const sourceText = null;
        const r = render(<TextRenderer value={sourceText} transform={null} pure />);
        expect(r.container.innerHTML).toEqual("");
    });

    it("should render an umodified text value when transformation is undefined", () => {
        const sourceText = null;
        const r = render(<TextRenderer value={sourceText} transform={undefined} pure />);
        expect(r.container.innerHTML).toEqual("");
    });

    it("protected method 'getFormatedText()' should return a string", () => {
        const sourceText = "SOURCE text";
        class TextRendererWrapper extends TextRenderer {
            public getFormatedText() {
                return super.getFormatedText();
            }
        }
        const component = new TextRendererWrapper({ value: sourceText, transform: "noop" });
        expect(component.getFormatedText()).toEqual(sourceText);
    });

});
