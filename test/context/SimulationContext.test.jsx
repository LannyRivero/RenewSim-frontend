import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { SimulationProvider, useSimulation } from '@/context/SimulationContext';


const TestComponent = () => {
  const { simulationId, setSimulationId } = useSimulation();

  return (
    <div>
      <div data-testid="sim-id">{simulationId}</div>
      <button onClick={() => setSimulationId("abc123")}>Set ID</button>
      <button onClick={() => setSimulationId(null)}>Clear ID</button>
    </div>
  );
};

describe('SimulationContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('initializes simulationId from localStorage', () => {
    localStorage.setItem("simulationId", "stored-id");

    render(
      <SimulationProvider>
        <TestComponent />
      </SimulationProvider>
    );

    expect(screen.getByTestId("sim-id").textContent).toBe("stored-id");
  });

  test('updates simulationId and localStorage when setSimulationId is called', () => {
    render(
      <SimulationProvider>
        <TestComponent />
      </SimulationProvider>
    );

    act(() => {
      screen.getByText("Set ID").click();
    });

    expect(screen.getByTestId("sim-id").textContent).toBe("abc123");
    expect(localStorage.getItem("simulationId")).toBe("abc123");
  });

  test('clears simulationId from state and localStorage when setSimulationId(null)', () => {
    localStorage.setItem("simulationId", "to-be-cleared");

    render(
      <SimulationProvider>
        <TestComponent />
      </SimulationProvider>
    );

    act(() => {
      screen.getByText("Clear ID").click();
    });

    expect(screen.getByTestId("sim-id").textContent).toBe("");
    expect(localStorage.getItem("simulationId")).toBe(null);
  });
});
