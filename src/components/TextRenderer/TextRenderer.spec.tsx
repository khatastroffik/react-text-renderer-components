import React from "react";
import { render } from '@testing-library/react';
import { TextRenderer } from "./TextRenderer";

// FIX "[ReferenceError: TextEncoder is not defined]" for Base64 transformations (see: https://stackoverflow.com/a/68468204)
import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextDecoder, TextEncoder });

const INVALID_CHARACTER_ERROR = "InvalidCharacterError";
const INVALID_UTF16_ERROR_MSG = "The input value is not well formed: it is not a valid UTF-16 string, since it contains lone surrogates.";
const INVALID_BASE64_ERROR_MSG = "The input value is not a valid BASE64 string and cannot be decoded.";


describe("TextRenderer component", () => {

    it("should render a 'spanned', lowercased text", () => {
        const sourceText = "SOURCE TEXT";
        const r = render(<TextRenderer value={sourceText} transform="lower-case" />);
        expect(r.container.innerHTML).toEqual(`<span>${sourceText.toLowerCase()}</span>`);
    });

    it("should render an empty text when value is undefined or null", () => {
        const sourceTextUndefined = undefined;
        const sourceTextNull = null;
        expect.assertions(2);
        const r1 = render(<TextRenderer value={sourceTextUndefined} transform="upper-case" pure />);
        expect(r1.container.innerHTML).toEqual("");
        const r2 = render(<TextRenderer value={sourceTextNull} transform="upper-case" pure />);
        expect(r2.container.innerHTML).toEqual("");
    });

    it("should render an umodified text value when transformation is invalid", () => {
        const sourceText = "I shall NOT be modified";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const invalidTransformation: any = "I'm an invalid transformation";
        const r = render(<TextRenderer value={sourceText} transform={invalidTransformation} pure />);
        expect(r.container.innerHTML).toEqual(sourceText);
    });

    it("should render an umodified text value when transformation is not defined or null", () => {
        const sourceText = "I shall NOT be modified";
        const invalidTransformationNull = null;
        const invalidTransformationUndefined = undefined;
        expect.assertions(4);
        const r1 = render(<TextRenderer value={sourceText} transform={invalidTransformationNull} pure />);
        expect(r1.container.innerHTML).toEqual(sourceText);
        const r2 = render(<TextRenderer value={sourceText} transform={invalidTransformationUndefined} pure />);
        expect(r2.container.innerHTML).toEqual(sourceText);
        const r3 = render(<TextRenderer value={sourceText} transform={null} pure />);
        expect(r3.container.innerHTML).toEqual(sourceText);
        const r4 = render(<TextRenderer value={sourceText} transform={undefined} pure />);
        expect(r4.container.innerHTML).toEqual(sourceText);
    });

    it("protected method 'getFormatedText()' should return a string", () => {
        const sourceText = "SOURCE text";
        class TextRendererWrapper extends TextRenderer {
            public getFormatedText() {
                return super.getFormatedText();
            }
        }
        const component = new TextRendererWrapper({ value: sourceText, transform: "lower-case" });
        expect(component.getFormatedText()).toEqual(sourceText.toLowerCase());
    });

});
describe("TextRenderer transformation", () => {

    it("should render an umodified text value when transformation is 'no-op' (no-operation)", () => {
        const sourceText = "I shall NOT be modified";
        const r = render(<TextRenderer value={sourceText} transform="no-op" pure />);
        expect(r.container.innerHTML).toEqual(sourceText);
    });

    it("should render a text value to lowercase", () => {
        const sourceText = "SOURCE TEXT";
        const r = render(<TextRenderer value={sourceText} transform="lower-case" pure />);
        expect(r.container.innerHTML).toEqual(sourceText.toLowerCase());
    });

    it("should render a text value to uppercase", () => {
        const sourceText = "source text";
        const r = render(<TextRenderer value={sourceText} transform="upper-case" pure />);
        expect(r.container.innerHTML).toEqual(sourceText.toUpperCase());
    });

    it("should render a text value to camel-case", () => {
        const sourceText = "I Think Ruth's Dog maXIMUM is cuter than your-dog_John23!";
        const expected = "iThinkRuthSDogMaximumIsCuterThanYourDogJohn23";
        const r = render(<TextRenderer value={sourceText} transform="camel-case" pure />);
        expect(r.container.innerHTML).toEqual(expected);
    });

    it("should render a text value to pascal-case", () => {
        const sourceText = "I Think Ruth's Dog maXIMUM is cuter than your-dog_John23!";
        const expected = "IThinkRuthSDogMaximumIsCuterThanYourDogJohn23";
        const r = render(<TextRenderer value={sourceText} transform="pascal-case" pure />);
        expect(r.container.innerHTML).toEqual(expected);
    });

    it("should render a text value to kebab-case", () => {
        const sourceText = "I Think Ruth's Dog maXIMUM is cuter than your-dog_John23!";
        const expected = "i-think-ruth-s-dog-maximum-is-cuter-than-your-dog-john23";
        const r = render(<TextRenderer value={sourceText} transform="kebab-case" pure />);
        expect(r.container.innerHTML).toEqual(expected);
    });

    it("should render a text value to snake-case", () => {
        const sourceText = "I Think Ruth's Dog maXIMUM is cuter than your-dog_John23!";
        const expected = "I_Think_Ruth_s_Dog_maXIMUM_is_cuter_than_your_dog_John23";
        const r = render(<TextRenderer value={sourceText} transform="snake-case" pure />);
        expect(r.container.innerHTML).toEqual(expected);
    });

    it("should render a text value in camel-case to kebab-case", () => {
        const sourceText = "iThinkRuthSDogMaximumIsCuterThanYourDogJohn23";
        const expected = "i-think-ruth-s-dog-maximum-is-cuter-than-your-dog-john23";
        const r = render(<TextRenderer value={sourceText} transform="camel-to-kebab" pure />);
        expect(r.container.innerHTML).toEqual(expected);
    });

    it("should render a text value in pascal-case to kebab-case", () => {
        const sourceText = "IThinkRuthSDogMaximumIsCuterThanYourDogJohn23";
        const expected = "i-think-ruth-s-dog-maximum-is-cuter-than-your-dog-john23";
        const r = render(<TextRenderer value={sourceText} transform="pascal-to-kebab" pure />);
        expect(r.container.innerHTML).toEqual(expected);
    });

    it("should decode a Base64 string value to a UTF-16 string", () => {
        const sourceText = "YSDEgCDwkICAIOaWhyDwn6aE";
        const expected = "a Ā 𐀀 文 🦄";
        const r = render(<TextRenderer value={sourceText} transform="from-base64" pure />);
        expect(r.container.innerHTML).toEqual(expected);
    });

    it("should encode an UTF-16 text value to a Base64 string", () => {
        const sourceText = "a Ā 𐀀 文 🦄";
        const expected = "YSDEgCDwkICAIOaWhyDwn6aE";
        const r = render(<TextRenderer value={sourceText} transform="to-base64" pure />);
        expect(r.container.innerHTML).toEqual(expected);
    });

    it("should throw when attempting to encode an invalid UTF-16 text value to a Base64 string", () => {
        const invalidSourceText = "hello⛳❤️🧀\uDE75";
        const spy = jest.spyOn(console, 'error');
        spy.mockImplementation(() => { });

        expect.assertions(3);
        try {
            render(<TextRenderer value={invalidSourceText} transform="to-base64" pure />);
        } catch (error) {
            expect(error).toBeInstanceOf(DOMException);
            expect(error).toHaveProperty('message', INVALID_UTF16_ERROR_MSG);
            expect(error).toHaveProperty('name', INVALID_CHARACTER_ERROR);
        }
        spy.mockRestore();
    });

    it("should throw when attempting to decode an invalid Base64 text value to a UTF-16 string", () => {
        const invalidSourceText = "BANZAI!";
        const spy = jest.spyOn(console, 'error');
        spy.mockImplementation(() => { });

        expect.assertions(3);
        try {
            render(<TextRenderer value={invalidSourceText} transform="from-base64" pure />);
        } catch (error) {
            expect(error).toBeInstanceOf(DOMException);
            expect(error).toHaveProperty('message', INVALID_BASE64_ERROR_MSG);
            expect(error).toHaveProperty('name', INVALID_CHARACTER_ERROR);
        }
        spy.mockRestore();
    });


});
