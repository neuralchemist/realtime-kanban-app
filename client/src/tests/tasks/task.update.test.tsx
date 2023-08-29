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

describe("User updates task successfully", () => {
  // setup server

  const server = setupServer(...successResponseHandler);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  // render component
  beforeEach(() => {
    render(<App />);
  });

  it("User updates a task's title and description and see changes in board", async () => {
    // 1. user select a project
    await selectAProject();

    // 2. user click on  task to open modal to update a task
    const taskSection = await screen.findByLabelText("task-section");
    const taskList = await within(taskSection).findAllByLabelText("task-item");
    const firstTask = taskList[0];
    await userEvent.click(firstTask);


    // 3. user types valid value for title and description
    const newTitle = "new task title";
    const newDescription = "new task description";
    const modal = await screen.findByLabelText("modal");
    const titleInput = within(modal).getByRole("textbox", { name: /title/i });
    const descriptionInput = within(modal).getByRole("textbox", {
      name: /description/i,
    });
    const updateButton = within(modal).getByRole("button", {
      name: /update/i,
    });

    // Clear the input fields first
    await userEvent.clear(titleInput);
    await userEvent.clear(descriptionInput);

    await userEvent.type(titleInput, newTitle);
    await userEvent.type(descriptionInput, newDescription);

    // 3. user click on submit button to update the task
    await userEvent.click(updateButton);

    // 4. user see the new task title renderd in the board
    const title = await within(taskSection).findByText(newTitle);
    // screen.debug(firstTask);
    expect(title).toBeInTheDocument();
  });
});
