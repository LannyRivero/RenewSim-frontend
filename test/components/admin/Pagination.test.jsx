import React, { useState } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Pagination from "@/components/admin/Pagination"; 

describe("Pagination Component", () => {

  it("should render pagination buttons when totalPages is greater than 1", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />);


    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });


  it("should not render pagination buttons if totalPages is 1 or less", () => {
    render(<Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />);
    expect(screen.queryByText("1")).not.toBeInTheDocument(); 
  });

  it("should call onPageChange when a page is clicked", async () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

    const pageButton = screen.getByText("2");
    fireEvent.click(pageButton);
    await waitFor(() => {
      expect(onPageChange).toHaveBeenCalledWith(2);
    });
  });


  it("should apply the active class to the current page", () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={vi.fn()} />);

    const activeButton = screen.getByText("2");
    expect(activeButton).toHaveClass("bg-green-600 text-white border-green-600 shadow-md scale-105");
  });


  it("should not apply the active class to non-current pages", () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={vi.fn()} />);

    const otherButton = screen.getByText("1");
    expect(otherButton).not.toHaveClass("bg-green-600 text-white border-green-600 shadow-md scale-105");
  });
});
