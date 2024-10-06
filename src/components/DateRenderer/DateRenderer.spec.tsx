import React from "react";
import { render } from '@testing-library/react';
import { DateRenderer } from "./DateRenderer";

// afterEach(cleanup);

const testDateString = "2024-10-06T04:40:55.221Z";
const testDateValue = new Date(testDateString);
const manuallyLocalizedTestDateString = testDateValue.toLocaleDateString("De-de");
const automaticallyLocalizedTestDateString = testDateValue.toLocaleDateString();

describe("DateRenderer component", () => {

    it("should render a date value to a pure specifically localized date string", () => {
        const r = render(<DateRenderer value={testDateValue} locale="De-de" pure />);
        expect(r.container.innerHTML).toEqual(manuallyLocalizedTestDateString);
    });

    it("should render a date value to a pure localized date string", () => {
        const r = render(<DateRenderer value={testDateValue} pure />);
        expect(r.container.innerHTML).toEqual(automaticallyLocalizedTestDateString);
    });

    it("should render an empty string when a date value is missing", () => {
        const r = render(<DateRenderer value={null} pure />);
        expect(r.container.innerHTML).toEqual("");
    });

    // it("protected method 'getFormatedText()' should return a localized date string", () => {
    //     class DateRendererWrapper extends DateRenderer {
    //         public getFormatedText() {
    //             return super.getFormatedText();
    //         }
    //     }
    //     const component = new DateRendererWrapper({ value: testDateValue });
    //     expect(component.getFormatedText()).toEqual(automaticallyLocalizedTestDateString);
    // });
});