import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { LoadingProvider, useLoading } from "@/context/LoadingContext";
import userEvent from '@testing-library/user-event';

const TestComponent = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  return (
    <div>
      <p data-testid="loading-state">{isLoading ? 'Loading' : 'Not Loading'}</p>
      <button onClick={startLoading}>Start</button>
      <button onClick={stopLoading}>Stop</button>
    </div>
  );
};

describe('LoadingContext', () => {
  it('should provide default isLoading state as false', () => {
    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );
    expect(screen.getByTestId('loading-state').textContent).toBe('Not Loading');
  });

  it('should set isLoading to true when startLoading is called', async () => {
    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );
    await userEvent.click(screen.getByText('Start'));
    expect(screen.getByTestId('loading-state').textContent).toBe('Loading');
  });

  it('should set isLoading to false when stopLoading is called', async () => {
    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );
    await userEvent.click(screen.getByText('Start'));
    await userEvent.click(screen.getByText('Stop'));
    expect(screen.getByTestId('loading-state').textContent).toBe('Not Loading');
  });
});
