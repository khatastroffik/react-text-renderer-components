import React from "react";
import { render } from '@testing-library/react';
import { WeekRenderer, calcISOWeek, defaultWeekRendererFormatOptions } from "./WeekRenderer";

const dateString = "2025-12-29T11:11:11.111Z";
const dateValue = new Date(dateString);

describe("WeekRenderer component", () => {

    it("should render a week number of a date value to a pure 2-digits string", () => {
        const r = render(<WeekRenderer value={dateValue} pure />);
        const x = calcISOWeek(dateValue);
        const formatter = new Intl.NumberFormat(undefined, defaultWeekRendererFormatOptions);
        const manuallyLocalizedWeekNumberString = formatter.format(x.week);

        expect(r.container.innerHTML).toEqual(manuallyLocalizedWeekNumberString);

    });

    it("should render a week number of a date value to a pure localized 1-digit string", () => {
        const r = render(<WeekRenderer value={dateValue} pure minimumIntegerDigits={1} />);
        const x = calcISOWeek(dateValue);
        const formatter = new Intl.NumberFormat(undefined, { ...defaultWeekRendererFormatOptions, minimumIntegerDigits: 1 });
        const manuallyLocalizedWeekNumberString = formatter.format(x.week);

        expect(r.container.innerHTML).toEqual(manuallyLocalizedWeekNumberString);
    });

    it("should render a week number of a date value to a pure string according to a given numbering system", () => {
        const r = render(<WeekRenderer value={dateValue} pure numberingSystem="tibt" />);
        const x = calcISOWeek(dateValue);
        const formatter = new Intl.NumberFormat(undefined, { ...defaultWeekRendererFormatOptions, numberingSystem: "tibt" });
        const manuallyFormatedWeekNumberString = formatter.format(x.week);

        expect(r.container.innerHTML).toEqual(manuallyFormatedWeekNumberString);
    });


    it("should render a week number of a date value to a pure localized string suffixed with the year of the week number", () => {
        const r = render(<WeekRenderer value={dateValue} displayYear pure />);
        const x = calcISOWeek(dateValue);
        const formatter = new Intl.NumberFormat(undefined, defaultWeekRendererFormatOptions);
        const manuallyLocalizedWeekNumberString = `${formatter.format(x.week)}/${x.year}`;

        expect(r.container.innerHTML).toEqual(manuallyLocalizedWeekNumberString);
    });


    it("should render an empty string when a date value is missing", () => {
        const r = render(<WeekRenderer value={null} pure />);

        expect(r.container.innerHTML).toEqual("");
    });

    it("should render correct week numbers for 'edge case' date values", () => {
        expect(render(<WeekRenderer value={dateValue} displayYear pure />).container.innerHTML).toEqual("01/2026");
        expect(render(<WeekRenderer value={new Date("2024-12-30T11:11:11.111Z")} displayYear pure />).container.innerHTML).toEqual("01/2025");
        expect(render(<WeekRenderer value={new Date("2025-01-01T11:11:11.111Z")} displayYear pure />).container.innerHTML).toEqual("01/2025");
        expect(render(<WeekRenderer value={new Date("2026-12-28T11:11:11.111Z")} displayYear pure />).container.innerHTML).toEqual("53/2026");
        expect(render(<WeekRenderer value={new Date("2027-01-03T11:11:11.111Z")} displayYear pure />).container.innerHTML).toEqual("53/2026");
        expect(render(<WeekRenderer value={new Date("2027-01-04T11:11:11.111Z")} displayYear pure />).container.innerHTML).toEqual("01/2027");
        expect(render(<WeekRenderer value={new Date("2025-12-29T11:11:11.111Z")} displayYear pure />).container.innerHTML).toEqual("01/2026");
    });

    it("protected method 'getFormatedText()' should return a localized week number as string", () => {
        class WeekRendererWrapper extends WeekRenderer {
            public getFormatedText() {
                return super.getFormatedText();
            }
        }
        const component = new WeekRendererWrapper({ value: dateValue });
        const automaticallyLocalizedWeekNumberString = new Intl.NumberFormat(undefined, defaultWeekRendererFormatOptions).format(calcISOWeek(dateValue).week);

        expect(component.getFormatedText()).toEqual(automaticallyLocalizedWeekNumberString);
    });

});
