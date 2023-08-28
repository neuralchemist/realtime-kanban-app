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

describe("User creates project", () => {
  const server = setupServer(...successResponseHandler);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    render(<App />);
  });

  it("user creates a new project and see it's title rendered in sidebar", async () => {
    // 1. user click on  button to open modal to create a project
    const drawer = await screen.findByLabelText("sidebar-drawer");
    const addProjectSection = await within(drawer).findByLabelText(
      "add-project-section"
    );
    const addProjectButton = within(addProjectSection).getByRole("button");

    await userEvent.click(addProjectButton);

    // 2. user types valid value for title and description
    const newTitle = "new project title";
    const newDescription = "new project description";
    const modal = await screen.findByLabelText("modal");
    const titleInput = within(modal).getByRole("textbox", { name: /title/i });
    const descriptionInput = within(modal).getByRole("textbox", {
      name: /description/i,
    });
    const createButton = within(modal).getByRole("button", {
      name: /create/i,
    });

    await userEvent.type(titleInput, newTitle);
    await userEvent.type(descriptionInput, newDescription);

    // 3. user click on submit button to create a new project
    await userEvent.click(createButton);

    // 4. user see the new project title renderd in the sidebar drawer
    const projectList = await within(drawer).findAllByLabelText("project-item");
    expect(projectList).toHaveLength(mockProjects.length + 1);

    const newProject = projectList[mockProjects.length];
    const title = within(newProject).getByText(newTitle);
    expect(title).toBeInTheDocument();
  });
});
