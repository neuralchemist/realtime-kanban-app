// msw
import { setupServer } from "msw/node";
// testing library
import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// vitest
import { describe, it, expect, beforeEach } from "vitest";
import { beforeAll, afterEach, afterAll } from "vitest";
// custom components
import App from "src/App";
import { successResponseHandler } from "../mock/successServer";
// mock data

import { mockProjects } from "../mock/projects";

describe("User sees projects", () => {
  const server = setupServer(...successResponseHandler);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  // render component
  beforeEach(() => {
    render(<App />);
  });

  it("User sees list of projects in sidebar", async () => {
    // 1. user sees 'loading project' message in the sidebar drawer
    const drawer = await screen.findByLabelText("sidebar-drawer");

    const loadingMessage = within(drawer).getByText(/loading project/i);
    expect(loadingMessage).toBeInTheDocument();

    // 2. user sees project titles rendered in the sidebar drawer
    const projectList = await within(drawer).findAllByLabelText("project-item");
    expect(projectList).toHaveLength(mockProjects.length);

    projectList.forEach((projectItem, index) => {
      const title = within(projectItem).getByText(mockProjects[index].title);
      expect(title).toBeInTheDocument();
    });
  });
});
