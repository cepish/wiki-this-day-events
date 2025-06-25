# Wikipedia "On This Day" Events Viewer

This project implements a simple React application that fetches and displays historical events from Wikipedia's "On This Day" API.

---

## Table of Contents

1.  [Features](#features)
2.  [Tech Stack](#tech-stack)
3.  [Installation](#installation)
4.  [Usage](#usage)
5.  [Code Quality & Pre-commit Hooks](#code-quality--pre-commit-hooks)

---

## 1. Features

The application provides the following functionalities:

- **Lazy Data Fetching:** Events are fetched only after a user explicitly clicks a button.
- **Loading Indicator:** A clear loading message/UI is displayed while data is being fetched from the API.
- **Error Handling:** A user-friendly error modal is displayed if the data fetch fails, providing short text about the issue.
- **Event Ordering:** Displayed events are consistently ordered by their year.
- **Basic Styling:** Provides a clean and functional user interface.

## 2. Tech Stack

This project is built using a modern React ecosystem:

- **Framework:** [React.js](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Data Fetching:** Native [Browser `fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) wrapped in a custom abstraction layer.
- **Application State Management:** [Zustand](https://zustand-zustand.netlify.app/)
- **UI Library:** [MUI (Material-UI)](https://mui.com/)
- **Styling:** [Emotion](https://emotion.sh/docs/introduction) (MUI's default CSS-in-JS solution)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Testing:** [Jest](https://jestjs.io/) and [React Testing Library (RTL)](https://testing-library.com/react/)

## 3. Installation

To set up the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/wikipedia-on-this-day.git](https://github.com/your-username/wikipedia-on-this-day.git)
    cd wikipedia-on-this-day
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

## 4. Usage

To run the application in development mode:

```bash
npm run dev
```

## 5. Code Quality & Pre-commit Hooks

This project utilizes [Husky](https://typicode.github.io/husky/) to enforce code quality standards before commits are made. A `pre-commit` Git hook is configured to run the following checks:

- **ESLint (`npm run lint`):** Ensures code follows linting rules, catching potential syntax errors, stylistic issues, etc.
- **Tests (`npm run test`):** Executes all unit and integration tests using Jest and React Testing Library.

If any linting errors or test failures are detected, the commit will be aborted. This helps maintain a clean, stable, and reliable codebase.
