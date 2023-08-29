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

describe("User sees the tasks", () => {
  const server = setupServer(...successResponseHandler);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  // render component
  beforeEach(() => {
    render(<App />);
  });

  it("User sees list of tasks in board", async () => {
    // 1. user select a project
    await selectAProject();
    // 2. user sees the task titles rendered in the task section of project page
    const taskSection = await screen.findByLabelText("task-section");
    const taskList = await within(taskSection).findAllByLabelText("task-item");
    expect(taskList).toHaveLength(mockTasks.length);

    taskList.forEach((taskItem, index) => {
      const title = within(taskItem).getByText(mockTasks[index].title);
      expect(title).toBeInTheDocument();
    });
  });
});
