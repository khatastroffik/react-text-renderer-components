import React from "react";
import { render } from '@testing-library/react';
import { QuarterRenderer, calcQuarter, defaultQuarterFormatOptions, defaultYearFormatOptions } from "./QuarterRenderer";

const dateString = "2025-12-29T11:11:11.111Z";
const dateValue = new Date(dateString);

describe("QuarterRenderer component", () => {

    it("should render a Quarter number of a date value to a pure 2-digits string", () => {
        const r = render(<QuarterRenderer value={dateValue} pure />);
        const q = calcQuarter(dateValue);
        const formatter = new Intl.NumberFormat(undefined, defaultQuarterFormatOptions);
        const manuallyLocalizedQuarterNumberString = formatter.format(q);

        expect(r.container.innerHTML).toEqual(manuallyLocalizedQuarterNumberString);

    });

    it("should render a Quarter number of a date value to a pure localized string suffixed with the year of the Quarter", () => {
        const r = render(<QuarterRenderer value={dateValue} displayYear pure />);
        const q = calcQuarter(dateValue);
        const quarterFormatter = new Intl.NumberFormat(undefined, defaultQuarterFormatOptions);
        const yearFormatter = new Intl.DateTimeFormat(undefined, defaultYearFormatOptions);
        const manuallyLocalizedQuarterNumberString = `${quarterFormatter.format(q)}/${yearFormatter.format(dateValue)}`;

        expect(r.container.innerHTML).toEqual(manuallyLocalizedQuarterNumberString);
    });

    it("should render an empty string when a date value is missing", () => {
        const r = render(<QuarterRenderer value={null} pure />);

        expect(r.container.innerHTML).toEqual("");
    });

    it("should render correct Quarter numbers for 'edge case' date values", () => {
        expect(render(<QuarterRenderer value={dateValue} displayYear pure />).container.innerHTML).toEqual("4/2025");
        expect(render(<QuarterRenderer value={new Date("2024-12-31T11:11:11.111Z")} displayYear pure />).container.innerHTML).toEqual("4/2024");
        expect(render(<QuarterRenderer value={new Date("2025-01-01T11:11:11.111Z")} displayYear pure />).container.innerHTML).toEqual("1/2025");
        expect(render(<QuarterRenderer value={new Date("2026-04-28T11:11:11.111Z")} displayYear pure />).container.innerHTML).toEqual("2/2026");
        expect(render(<QuarterRenderer value={new Date("2027-07-31T11:11:11.111Z")} displayYear pure />).container.innerHTML).toEqual("3/2027");
        expect(render(<QuarterRenderer value={new Date("2027-10-04T11:11:11.111Z")} displayYear pure />).container.innerHTML).toEqual("4/2027");
    });

    it("protected method 'getFormatedText()' should return a localized Quarter number as string", () => {
        class QuarterRendererWrapper extends QuarterRenderer {
            public getFormatedText() {
                return super.getFormatedText();
            }
        }
        const component = new QuarterRendererWrapper({ value: dateValue });
        const automaticallyLocalizedQuarterNumberString = new Intl.NumberFormat(undefined, defaultQuarterFormatOptions).format(calcQuarter(dateValue));

        expect(component.getFormatedText()).toEqual(automaticallyLocalizedQuarterNumberString);
    });

});