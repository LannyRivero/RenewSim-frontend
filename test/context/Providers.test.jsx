import React from "react";
import { render, screen } from "@testing-library/react";
import { AppProviders } from "@/context/Providers";

describe("AppProviders", () => {
  it("renders children with all providers", () => {
    render(
      <AppProviders>
        <div>Test Child</div>
      </AppProviders>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });
});
