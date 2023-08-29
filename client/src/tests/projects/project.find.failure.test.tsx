// msw
import { setupServer } from "msw/node";
// testing library
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { waitForElementToBeRemoved, within } from "@testing-library/react";
// vitest
import { describe, it, expect, beforeEach } from "vitest";
import { beforeAll, afterEach, afterAll } from "vitest";
// custom components
import App from "src/App";
import { failureResponseHandler } from "../mock/failureServer";

describe("User sees error message", () => {
  // setup server
  const server = setupServer(...failureResponseHandler);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  // render component
  beforeEach(() => {
    render(<App />);
  });

  it("Users sees error message in sidebar when project fails to load", async () => {
    const drawer = await screen.findByLabelText("sidebar-drawer");

    await waitForElementToBeRemoved(() =>
      within(drawer).getByText(/loading project/i)
    );

    const errorProjectMessage = within(drawer).getByText(
      /failed to load projects/i
    );

    expect(errorProjectMessage).toBeInTheDocument();
  });
});
