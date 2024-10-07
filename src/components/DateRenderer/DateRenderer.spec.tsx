import React from "react";
import { render } from '@testing-library/react';
import { DateRenderer, defaultDateRendererFormatOptions } from "./DateRenderer";
import { dateValue, locale } from "../../../jest.setup";

describe("DateRenderer component", () => {

    it("should render a date value to a pure specifically localized date string", () => {
        const r = render(<DateRenderer value={dateValue} locale={locale} pure />);
        const manuallyLocalizedDateString = new Intl.DateTimeFormat(locale, defaultDateRendererFormatOptions).format(dateValue);
        expect(r.container.innerHTML).toEqual(manuallyLocalizedDateString);
    });

    it("should render a date value to a pure localized date string", () => {
        const r = render(<DateRenderer value={dateValue} pure />);
        const automaticallyLocalizedDateString = new Intl.DateTimeFormat(undefined, defaultDateRendererFormatOptions).format(dateValue);
        expect(r.container.innerHTML).toEqual(automaticallyLocalizedDateString);
    });

    it("should render an empty string when a date value is missing", () => {
        const r = render(<DateRenderer value={null} pure />);
        expect(r.container.innerHTML).toEqual("");
    });

    it("protected method 'getFormatedText()' should return a localized date string", () => {
        class DateRendererWrapper extends DateRenderer {
            public getFormatedText() {
                return super.getFormatedText();
            }
        }
        const component = new DateRendererWrapper({ value: dateValue });
        const automaticallyLocalizedDateString = new Intl.DateTimeFormat(undefined, defaultDateRendererFormatOptions).format(dateValue);
        expect(component.getFormatedText()).toEqual(automaticallyLocalizedDateString);
    });

});