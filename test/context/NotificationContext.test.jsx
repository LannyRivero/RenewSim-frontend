import React from "react";
import { render, screen, act } from "@testing-library/react";
import { NotificationProvider, useNotification } from "@/context/NotificationContext";
import { vi } from "vitest";

vi.useFakeTimers();

const TestComponent = () => {
  const { notification, showSuccess, showError, showInfo } = useNotification();

  return (
    <div>
      <button onClick={() => showSuccess("Success message")}>Success</button>
      <button onClick={() => showError("Error message")}>Error</button>
      <button onClick={() => showInfo("Info message")}>Info</button>
      {notification && (
        <div data-testid="notification">
          <span>{notification.type}</span>
          <p>{notification.text}</p>
        </div>
      )}
    </div>
  );
};

describe("NotificationContext", () => {
  it("shows and auto-dismisses a success message", async () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    act(() => {
      screen.getByText("Success").click();
    });

    expect(screen.getByTestId("notification")).toHaveTextContent("Success message");

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByTestId("notification")).toBeNull();
  });

  it("shows error and info messages correctly", () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    act(() => {
      screen.getByText("Error").click();
    });
    expect(screen.getByTestId("notification")).toHaveTextContent("Error message");

    act(() => {
      screen.getByText("Info").click();
    });
    expect(screen.getByTestId("notification")).toHaveTextContent("Info message");
  });
});
