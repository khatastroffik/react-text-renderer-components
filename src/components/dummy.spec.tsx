import React from "react";
import { render } from '@testing-library/react';
import { Dummy } from "./dummy";

describe("Dummy component", () => {
  it("should render the text 'dummy'", () => {
    const r = render(<Dummy />);
    expect(r.container.innerHTML).toEqual("Dummy");
    expect(r.getByText("Dummy")).toHaveTextContent("Dummy");
    expect(r.getByText("Dummy")).toBeInTheDocument();
  });

});