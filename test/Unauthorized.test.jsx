import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Unauthorized from "../src/pages/Unauthorized";


describe("Unauthorized component", () => {
  it("renders the title", () => {
    render(
      <MemoryRouter>
        <Unauthorized />
      </MemoryRouter>
    );
    const titleElement = screen.getByText(/⛔ Acceso Denegado/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the message", () => {
    render(
      <MemoryRouter>
        <Unauthorized />
      </MemoryRouter>
    );
    const messageElement = screen.getByText(/No tienes permisos para acceder a esta página/i);
    expect(messageElement).toBeInTheDocument();
  });

  it("renders the 'Volver al inicio' link", () => {
    render(
      <MemoryRouter>
        <Unauthorized />
      </MemoryRouter>
    );
    const linkElement = screen.getByRole("link", { name: /Volver al inicio/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute("href")).toBe("/");
  });
});
