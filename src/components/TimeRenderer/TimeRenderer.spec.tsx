import React from "react";
import { render } from '@testing-library/react';
import { defaultTimeRendererFormatOptions, TimeRenderer } from "./TimeRenderer";
import { dateValue, locale } from "../../../jest.setup";

describe("TimeRenderer component", () => {

    it("should render a date value to a pure specifically localized time string", () => {
        const r = render(<TimeRenderer value={dateValue} locale={locale} pure />);
        const manuallyLocalizedTimeString = new Intl.DateTimeFormat(locale, defaultTimeRendererFormatOptions).format(dateValue);
        expect(r.container.innerHTML).toEqual(manuallyLocalizedTimeString);
    });

    it("should render a date value to a pure localized time string", () => {
        const r = render(<TimeRenderer value={dateValue} pure />);
        const automaticallyLocalizedTimeString = new Intl.DateTimeFormat(undefined, defaultTimeRendererFormatOptions).format(dateValue);
        expect(r.container.innerHTML).toEqual(automaticallyLocalizedTimeString);
    });

    it("should render an empty string when a date value is missing", () => {
        const r = render(<TimeRenderer value={null} pure />);
        expect(r.container.innerHTML).toEqual("");
    });

    it("should render a date value to a pure localized time string corresponding to the given timezone", () => {
        const r = render(<TimeRenderer value={dateValue} timeZone="America/Lima" pure />);
        const automaticallyLocalizedTimeString = new Intl.DateTimeFormat(undefined, { ...defaultTimeRendererFormatOptions, timeZone: "America/Lima" }).format(dateValue);
        expect(r.container.innerHTML).toEqual(automaticallyLocalizedTimeString);
    });

    it("protected method 'getFormatedText()' should return a localized time string", () => {
        class TimeRendererWrapper extends TimeRenderer {
            public getFormatedText() {
                return super.getFormatedText();
            }
        }
        const component = new TimeRendererWrapper({ value: dateValue });
        const automaticallyLocalizedDateString = new Intl.DateTimeFormat(undefined, defaultTimeRendererFormatOptions).format(dateValue);
        expect(component.getFormatedText()).toEqual(automaticallyLocalizedDateString);
    });

});