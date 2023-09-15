# Realtime Kanban App


Welcome to the Full-stack Real-time Kanban App with drag-and-drop! This project uses the MERN stack (MongoDB, Express, React & Nodejs). It is designed for freelancers and startups, but can also be used for almost any sized company. With this application, you can collaborate on projects with your team members from all over the world in real time. I've leveraged my expertise in modern software development practices and methodologies to create an application that's both functional and maintainable.

You can start using it by downloading the entire Source code and then run it on your server.


<img src="https://github.com/neuralchemist/realtime-kanban-app/blob/main/client/src/assets/realtime-kanban-app.gif" alt="realtime-kanban-app.gif" style="float: left; margin-right: 10px;" />


## How I worked on this project

In developing this project, I adhered to industry best practices to ensure efficiency and maintainability. My goal was to simulate a professional work environment. 

My workflow included:

- **Git and GitHub:** I followed a structured Git workflow, using feature branches and pull requests (a variation of trunk-based development). This ensured clean, organized code and facilitated collaboration.

- **Clean Code and Folder Structure:** Maintaining clean, readable code is paramount. I adopted professional folder structures and naming conventions to enhance code clarity and maintainability.

- **End-to-End Testing:** I employed React Testing Library for comprehensive end-to-end testing. This approach simulates real user interactions and provides high test coverage.

- **TypeScript:** I used TypeScript to enhance code quality and maintainability. Strongly typed code reduces errors and improves code documentation.

## How to navigate this project

### Client

The client-side code includes:

- **Responsive CSS:** CSS is designed for responsiveness using Material-UI and Styled Components. [Example Code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/client/src/features/layout/styles.ts)

- **End-to-End Tests:** Comprehensive testing with React Testing Library. [Example Tests](https://github.com/neuralchemist/realtime-kanban-app/tree/main/client/src/tests/projects)

- **CRUD Operations:** REST API integration for Create, Read, Update, and Delete operations. [Example Code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/client/src/entities/task/api/index.ts)

- **Async State Management:** Utilizing React Query for state management and caching. [Example Code](https://github.com/neuralchemist/realtime-kanban-app/tree/main/client/src/entities/task/hooks)

- **Form State Management:** Efficient form management with React Hook Form. [Example Code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/client/src/features/board/components/CreateTaskForm/index.tsx)

- **Real-Time Updates:** Implementation of real-time updates using Socket.io. [Example Code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/client/src/common/hooks/useSocket.ts)

- **Advanced State Management:** Efficient state management using context hooks. [Example Code](https://github.com/neuralchemist/realtime-kanban-app/tree/main/client/src/common/context)

- **Performance Optimization:** Leveraging useMemo for optimized component performance. [Example Code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/client/src/features/board/components/TaskSection/TaskBoard.tsx)

- **Form Validation:** Form validation using Zod. [Example Code](https://github.com/neuralchemist/realtime-kanban-app/tree/main/client/src/entities/project/validators)

- **Reusable UI Components:** Developing reusable UI components for scalability. [Example Code](https://github.com/neuralchemist/realtime-kanban-app/tree/main/client/src/common/components)


### Server

The server-side code adheres to clean architecture principles:

- **Service Layer:** Contains business logic independent of delivery mechanisms or data sources. [Example Code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/server/src/features/project/service/project.service.ts)

- **Repository Layer:** Handles data storage and retrieval, abstracting underlying data sources. [Example Code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/server/src/features/project/repository/mongodb.repository.ts)

- **Controller Layer:** Manages incoming requests and outgoing responses. [Example Code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/server/src/features/project/contoller/projects.controller.ts)

- **Model Layer:** Represents core domain entities. [Example Code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/server/src/features/project/model/project.model.ts)

- **Routes Layer:** Defines HTTP routes and endpoints. [Example Code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/server/src/features/project/routes/projects.routes.ts)

- **Validation:** Utilizing Zod for request validation. [Example Code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/server/src/features/project/validator/projectCreateValidator.ts)

- **Middlewares:** Employing various middlewares for request handling. [Example Code](https://github.com/neuralchemist/realtime-kanban-app/tree/main/server/src/common/middlewares)

- **Socket Manager:** Implementing a socket manager for real-time communication. [Example Code](https://github.com/neuralchemist/realtime-kanban-app/blob/main/server/src/common/utils/socketManager.ts)


## Why I built the project this way

My choice of technologies and architecture reflects a commitment to best practices:

- **Modular Component-Based Architecture:** The MERN stack encourages a modular, component-based architecture, fostering code reusability and maintainability.

- **Clean Architecture:** I employed clean architecture principles to keep business logic separate from implementation details. This approach enhances maintainability, testability, and adaptability to future changes.

- **State Management:** I utilized modern state management techniques including `useState`, `useContext`, `react-query`, and `react-hook-form`. Consciously, I avoided introducing a state management library like Redux, as many contemporary projects are moving away from them.

- **UI Components:** Material-UI and styled components play a significant role in creating professional and customizable UI components. Styled components offer features such as auto-prefixing, scoped classes, and seamless integration with JavaScript.

- **Comprehensive Testing:** Recognizing the importance of testing in production applications, I prioritized end-to-end testing. This approach effectively simulates real user scenarios and achieves extensive test coverage.


## Key Features

- **Comprehensive Project and Task Management:** Users have the ability to seamlessly perform actions like fetching, creating, updating, and deleting projects and tasks.

- **Real-time Collaboration:** Teamwork becomes efficient with real-time updates, enabling users to stay synchronized when team members make changes.

- **Intuitive Drag-and-Drop:** The application offers an intuitive interface, allowing users to effortlessly drag-and-drop tasks on the Kanban board.

- **Easy Project Sharing:** Users can easily copy project links and share them with collaborators, enhancing collaboration and communication.

- **Cross-Device Compatibility:** Whether on a mobile device, tablet, or desktop computer, users can access and utilize the application seamlessly.

These features not only enhance functionality but also reflect the commitment to a user-centric and efficient design approach.


## If I had more time I would change this

Given additional time, I would further improve this project by:

- Adding unit and integration tests for both server and client to enhance robustness.

- Implementing continuous integration to run tests and ESLint on every pull request, ensuring code quality.

- Incorporating authentication and authorization features to enhance security.

- Containerizing the application using Docker for improved deployment and scalability.


This project demonstrates my ability to apply best practices in software development, leveraging modern technologies to create a real-time Kanban application that is both functional and maintainable. Thank you for reviewing my work.
