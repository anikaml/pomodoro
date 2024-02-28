# 🍅 Pomodoro Timer App

## Overview

The Pomodoro Technique is a popular time management method for boosting productivity and focus. This web-based Pomodoro timer application helps users implement this technique by providing customizable timers, sound notifications, and progress tracking.

## Design Choices and Unique Features

* **Structure:** The application is divided into reusable components to maintain a clean and organized codebase.
* **State Management:** Utilizes React's useState hook for managing timer state.
* **Customizable Timers:** Allows work and break session customization.
* **Progress Tracker:** Displays a visual representation of time remaining, giving users a clear indication of their progress.
* **Sound Notifications:** Implements sound alerts using HTML5 audio elements triggered at specific timer events via a custom useAudio hook.
* **Task Listing:** Lists active, completed and future Pomodoro sessions
* **Statistics:** Displays statistics across all tasks
* **Responsive Design:** Ensures the application is mobile-friendly and adapts to different screen sizes.
* **Theme Customization:** Allows switching between light and dark modes
* **Persistent Storage:** Implements storage of settings and task history which persist long term via IndexedDB

## Project Setup

To run this project locally, follow these steps:

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies with `npm install`
4. Start the development server with `npm run dev`
5. Visit [http://localhost:5173/](http://localhost:5173/)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.
Open [http://localhost:5173/](http://localhost:5173/) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm run lint`

Runs ESLint against all applicable files.\
Open [ESLint](https://eslint.org/) for more information.

### `npm run test`

Launches the Jest test runner.\
See the section about [running tests](https://jestjs.io/docs/tutorial-react) for more information.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

Open [Building the App](https://vitejs.dev/guide/static-deploy#building-the-app) for more information.

### `npm run preview`

Preview the production build locally using a simple HTTP server.
Open [http://localhost:4173](http://localhost:4173) to view it in the browser.\
See [Testing the App Locally](https://vitejs.dev/guide/static-deploy#testing-the-app-locally) for more information.
