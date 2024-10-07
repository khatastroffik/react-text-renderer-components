import React from "react";
import { render } from '@testing-library/react';
import { DateTimeRenderer, defaultDateTimeRendererFormatOptions } from "./DateTimeRenderer";
import { dateValue, formatDateTimeOptions, locale } from "../../../jest.setup";

describe("DateTimeRenderer component", () => {

    it("should render a date value to a pure specifically localized date + time string", () => {
        const r = render(<DateTimeRenderer value={dateValue} locale={locale} pure />);
        const manuallyLocalizedDateTimeString = new Intl.DateTimeFormat(locale, defaultDateTimeRendererFormatOptions).format(dateValue);
        expect(r.container.innerHTML).toEqual(manuallyLocalizedDateTimeString);
    });

    it("should render a date value to a pure localized date + time string", () => {
        const r = render(<DateTimeRenderer value={dateValue} pure />);
        const automaticallyLocalizedDateTimeString = new Intl.DateTimeFormat(undefined, defaultDateTimeRendererFormatOptions).format(dateValue);
        expect(r.container.innerHTML).toEqual(automaticallyLocalizedDateTimeString);
    });

    it("should render an empty string when a date value is missing", () => {
        const r = render(<DateTimeRenderer value={null} pure />);
        expect(r.container.innerHTML).toEqual("");
    });

    it("should render a date value to a pure specifically localized and formated date + time string", () => {
        const r = render(<DateTimeRenderer value={dateValue} locale={locale} formatOptions={formatDateTimeOptions} pure />);
        const manuallyLocalizedAndFormatedDateTimeString = new Intl.DateTimeFormat(locale, formatDateTimeOptions).format(dateValue);
        expect(r.container.innerHTML).toEqual(manuallyLocalizedAndFormatedDateTimeString);
    });

    it("protected method 'getFormatedText()' should return a localized date + time string", () => {
        class DateTimeRendererWrapper extends DateTimeRenderer {
            public getFormatedText() {
                return super.getFormatedText();
            }
        }
        const component = new DateTimeRendererWrapper({ value: dateValue });
        const automaticallyLocalizedDateString = new Intl.DateTimeFormat(undefined, defaultDateTimeRendererFormatOptions).format(dateValue);
        expect(component.getFormatedText()).toEqual(automaticallyLocalizedDateString);
    });

});