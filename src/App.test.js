import { render, screen } from '@testing-library/react';
import App from './App';

test('renders webapp', () => {
  render(<App />);
  expect(screen.getByRole("heading")).toHaveTextContent(/Broccoli & Co./);
  expect(screen.getByText("A better way to enjoy every day."));
  expect(screen.getByText("Be the first to know when we launch."));
  expect(screen.getByRole("button", { name: "Request an invite"}));
});
