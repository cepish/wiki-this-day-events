# Wikipedia "On This Day" Events Viewer

This project implements a simple React application that fetches and displays historical events from Wikipedia's "On This Day" API. The application focuses on demonstrating modern frontend development practices using a specified tech stack.

---

## Table of Contents

1.  [Features](#features)
2.  [Tech Stack](#tech-stack)
3.  [Architecture & Design Choices](#architecture--design-choices)
4.  [Installation](#installation)
5.  [Usage](#usage)
6.  [Testing](#testing)
7.  [Project Structure](#project-structure)
8.  [Future Enhancements](#future-enhancements)
9.  [License](#license)

---

## 1. Features

The application provides the following functionalities:

- **Lazy Data Fetching:** Events are fetched only after a user explicitly clicks a button, not on initial page load.
- **Dynamic Date Selection:** Users can select a specific month and day to view "On This Day" events.
- **Loading Indicator:** A clear loading message/UI is displayed while data is being fetched from the API.
- **Error Handling:** A user-friendly error modal is displayed if the data fetch fails, providing details about the issue.
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

## 3. Architecture & Design Choices

The application's architecture is designed for clarity, maintainability, and scalability:

- **Client-Side Rendering (CSR):** The application is a Single-Page Application (SPA) where React renders the UI in the browser.
- **API Abstraction Layer (`src/api`):** A dedicated layer (`jsonApi`) centralizes all network requests. This ensures consistent error handling, simplifies header management, and allows for easy migration to a different HTTP client (e.g., Axios) in the future without affecting higher-level components.
- **Zustand for Global State (`src/store`):** A lightweight and flexible state management solution is used to manage application-wide data (like fetched Wikipedia events, loading states, and errors). This separates data logic from UI components.
- **Custom Hooks (`src/hooks`):** Logic specific to data fetching or complex component behavior is encapsulated in custom hooks, promoting reusability and keeping components lean.
- **MUI Components:** The UI is composed using pre-built MUI components, ensuring a consistent design system and faster development.
- **Modular Project Structure:** The codebase is organized into logical directories (e.g., `components`, `hooks`, `api`, `store`, `types`) to improve navigation and separation of concerns.

## 4. Installation

To set up the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/wikipedia-on-this-day.git](https://github.com/your-username/wikipedia-on-this-day.git)
    cd wikipedia-on-this-day
    ```
2.  **Install dependencies:**
    ```bash
    npm install # or yarn install or pnpm install
    ```

## 5. Usage

To run the application in development mode:

```bash
npm run dev # or yarn dev or pnpm dev
```
