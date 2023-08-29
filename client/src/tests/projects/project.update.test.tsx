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

const selectAProject = async () => {
  // 1. user wait for project page to load
  const main = await screen.findByRole("main");
  await within(main).findByText(/login page/i);

  // 2. user sees 'no project selectd' in project page
  const NoProjectSelectedMessage = await within(main).findByText(
    /no project selected/i
  );

  expect(NoProjectSelectedMessage).toBeInTheDocument();

  // 3. user clicks a project from sidbar drawer
  const drawer = await screen.findByLabelText("sidebar-drawer");
  const projectList = await within(drawer).findAllByLabelText("project-item");
  const firstProject = within(projectList[0]).getByRole("button");
  await userEvent.click(firstProject);
};

describe("User updates a project", () => {
  const server = setupServer(...successResponseHandler);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    render(<App />);
  });

  it("User updates  project's title and description and see changes in board", async () => {
    // 1. user select a project
    await selectAProject();

    // 2. user types valid value for title and description
    const newTitle = "new project title";
    const newDescription = "new project description";

    const updateForm = await screen.findByLabelText("update-project-form");
    const titleInput = within(updateForm).getByPlaceholderText(/title/i);
    const descriptionInput =
      within(updateForm).getByPlaceholderText(/description/i);
    const updateButton = within(updateForm).getByRole("button", {
      name: /update/i,
    });
    // Clear the input fields first
    await userEvent.clear(titleInput);
    await userEvent.clear(descriptionInput);

    await userEvent.type(titleInput, newTitle);
    await userEvent.type(descriptionInput, newDescription);

    // 3. user click on  update button to update  project
    await userEvent.click(updateButton);
    // ---debug---

    // const main = await screen.findByLabelText("project-section");
    // screen.debug(main);

    // 4. user see the updated project title renderd in the sidebar drawer
    const drawer = await screen.findByLabelText("sidebar-drawer");
    const projectList = await within(drawer).findAllByLabelText("project-item");
    expect(projectList).toHaveLength(mockProjects.length);

    const updatedProject = projectList[0];
    screen.debug(updatedProject);

    const title = within(updatedProject).getByText(newTitle);
    expect(title).toBeInTheDocument();
  });
});
