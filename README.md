# realtime-kanban-app

### Introduction

* * *

This is a full stack real-time kanban application with drag-and-drop, made using the MERN stack (MongoDB, Express, React & Nodejs). It is specially designed for freelancers and small businesses, but can be used for almost any sized company. With this application, you can collaborate on projects with your team members from all over the world in real-time. Start using it by downloading the entire Source code and run it on your server.

<img src="https://github.com/neuralchemist/realtime-kanban-app/blob/main/client/src/assets/realtime-kanban-app.gif" alt="realtime-kanban-app.gif" style="float: left; margin-right: 10px;" />


### How I worked on this project

* * *

My goal was to simulate a professional work environment

- I used feature branches and pull requests (trunk-based development with git)
- I used clean code and a professional folder structure.
- I used end-to-end testing with react-testing-library
- I used typescript, which enhance code quality and code maintainability.

### How to navigate this project

* * *

**client**

- Responsive CSS using material-ui and styled-components: [example code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/client/src/features/layout/styles.ts)
- End-To-End test with react-testing-library: [example tests](https://github.com/neuralchemist/realtime-kanban-app/tree/main/client/src/tests/projects)
- CRUD operations with REST API: [example code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/client/src/entities/task/api/index.ts)
- Async State-Management and Caching with react-query: [example code](https://github.com/neuralchemist/realtime-kanban-app/tree/main/client/src/entities/task/hooks)
- Form State-Management with react-hook-from: [example code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/client/src/features/board/components/CreateTaskForm/index.tsx)
- Real-time updates with socket.io: [example code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/client/src/common/hooks/useSocket.ts)
- Advance State-Management with context hooks: [example code](https://github.com/neuralchemist/realtime-kanban-app/tree/main/client/src/common/context)
- Optimized performance of component using `useMemo`: [example code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/client/src/features/board/components/TaskSection/TaskBoard.tsx)
- Form validation with zod: [example code](https://github.com/neuralchemist/realtime-kanban-app/tree/main/client/src/entities/project/validators)
- Reusable UI components: [example code](https://github.com/neuralchemist/realtime-kanban-app/tree/main/client/src/common/components)

**server**

- used clean architecture to keep the core business logic (Service and Model) separate from implementation details of delivery mechanism (Controller and Routes) and data Storage (Repository): [example code](https://github.com/neuralchemist/realtime-kanban-app/tree/main/server/src/features/project)
    - **Service layer** contains business logic that's independent of the delivery mechanism or the data source: [example code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/server/src/features/project/service/project.service.ts)
    - **Repository layer** deals with data storage and retrieval. It abstracts the underlying data source, such as databases, APIs, or external systems: [example code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/server/src/features/project/repository/mongodb.repository.ts)
    - **Controller layer** is part of the delivery mechanism. It handles incoming requests and outgoing responses. [example code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/server/src/features/project/contoller/projects.controller.ts)
    - **Model layer** represents the core domain entities:  [example code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/server/src/features/project/model/project.model.ts)
    - **Routes layer** defines the HTTP routes and endpoints exposed by the application:  [example code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/server/src/features/project/routes/projects.routes.ts)
- zod for validation: [example code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/server/src/features/project/validator/projectCreateValidator.ts)
- middlewares: [example code](https://github.com/neuralchemist/realtime-kanban-app/tree/main/server/src/common/middlewares)
- socket manager for real-time communication: [example code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/server/src/common/utils/socketManager.ts)

### Why I built the project this way

* * *

- I used `useState`, `useContext`, `react-query`, and `react-hook-form` for state management. I didn't use a state management library like Redux on purpose since more and more projects don't use them anymore.
- Material-UI and styled components are great for creating custom professional-looking UI components. Styled components include auto-prefixer, scoped classes, and allow smooth integration with JS.
- Testing is vital for every production application. I focused on end-to-end testing since it simulates real user scenarios and has the highest test coverage.
- I used the MERN stack because it encourages modular component-based architecture. This increases code re-usability and maintainability. Also, I am more familiar with these technologies.
- Used clean architecture to make the application more maintainable, testable and adaptable to future changes in technology or requirements

### Key Features

* * *

- User can fetch, create, update, and delete projects and tasks.
- User can see real-time updates when teammates make changes.
- User can drag-and-drop tasks on the board.
- User can copy project links and share them with others for collaboration.
- User can use the app in mobile, tablet, and desktop format.

### If I had more time I would change this

* * *

- Add unit tests and integration-tests for both server and client.
- Setup continuous integration to run tests and ESLint on every pull request
- Add authentication and authorization features.
- use docker

