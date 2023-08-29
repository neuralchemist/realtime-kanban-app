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
import { mockTasks } from "../mock/tasks";

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

describe("User creates a task successfully", () => {
  // setup server

  const server = setupServer(...successResponseHandler);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  // render component
  beforeEach(() => {
    render(<App />);
  });

  it("User creates a task and sees it in board", async () => {
    // 1. user select a project
    await selectAProject();

    // 2. user click on  button to open modal to create a task
    const addTaskSection = await screen.findByLabelText("add-task-section");
    const addTaskButton = within(addTaskSection).getByRole("button");
    await userEvent.click(addTaskButton);
    // 3. user types valid value for title and description
    const newTitle = "new task title";
    const newDescription = "new task description";
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

    // 3. user click on submit button to create a new task
    await userEvent.click(createButton);

    // 4. user see the new task title renderd in the board
    const taskSection = await screen.findByLabelText("task-section");
    const taskList = await within(taskSection).findAllByLabelText("task-item");
    expect(taskList).toHaveLength(mockTasks.length + 1);

    const title = await within(taskSection).findByText(newTitle);
    expect(title).toBeInTheDocument();
  });
});
