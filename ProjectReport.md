
# Project Report: AYHS - A Web-Based Healthcare Assistant

## 1. Introduction

This report provides a comprehensive analysis of the AYHS project, a web-based healthcare application. The project aims to provide users with a suite of tools to manage their health, including features for finding doctors, searching for medicines, getting meal suggestions, and interacting with an AI-powered chatbot. This document details the project's architecture, technology stack, key features, and potential areas for future development.

## 2. Technology Stack

The AYHS project is a full-stack web application built with a modern technology stack.

### 2.1. Frontend

*   **Framework:** React.js with Vite for a fast development experience.
*   **Routing:** `react-router-dom` for client-side routing.
*   **Styling:** A combination of CSS, Tailwind CSS, and GSAP for animations.
*   **UI Components:** A mix of custom components and libraries like `@mui/material` and `@radix-ui/react-toast` for UI elements.
*   **State Management:** `react-query` for managing server state.
*   **AI:** `@tensorflow/tfjs` for in-browser machine learning.

### 2.2. Backend

*   **Framework:** Node.js with Express.js.
*   **Database:** MongoDB with Mongoose for object data modeling.
*   **Authentication:** JSON Web Tokens (JWT) for securing routes.
*   **Web Scraping:** Puppeteer for extracting data from external websites.
*   **API Communication:** `axios` for making HTTP requests to external APIs.

### 2.3. External Services

*   **Google Custom Search API:** Used to search for medicines on various pharmacy websites.
*   **Gemini API:** Leveraged for its generative AI capabilities to provide users with links to purchase medicines.
*   **OpenAI API:** Integrated to offer an alternative AI-powered chatbot for medicine-related queries.

## 3. Project Structure

The project is organized into a monorepo structure with a `frontend` and `backend` directory.

*   **`frontend`:** Contains the React application, with a clear separation of components, pages, and services.
*   **`backend`:** Houses the Node.js server, which handles API requests, database interactions, and web scraping.

## 4. Key Features

The AYHS application offers a range of features designed to assist users in managing their health.

### 4.1. User Authentication

*   **Registration:** New users can create an account by providing their name, email, and password.
*   **Login:** Existing users can log in to access their profile and other protected routes.
*   **JWT-based Authentication:** The application uses JWTs to secure user sessions and protect sensitive data.

### 4.2. Medicine Search

*   **Multi-pharmacy Search:** Users can search for medicines across multiple online pharmacies (Netmeds, PharmEasy, 1mg).
*   **Price Comparison:** The application scrapes prices from these websites and presents them to the user, sorted from lowest to highest.
*   **AI-powered Links:** The application uses the Gemini and OpenAI APIs to provide users with direct links to purchase medicines.

### 4.3. AI Chatbot

*   **Interactive Chat:** Users can interact with an AI-powered chatbot to get answers to their health-related questions.
*   **TensorFlow.js Integration:** The application uses TensorFlow.js for in-browser machine learning, which could be used for features like symptom checking or personalized health recommendations.

### 4.4. Other Features

*   **Doctor Search:** Users can search for doctors based on their specialty and location.
*   **Meal Suggestions:** The application provides users with personalized meal suggestions.
*   **Community Forum:** A community forum where users can connect with each other and share their experiences.

## 5. Code Analysis

### 5.1. Frontend

*   **Component-based Architecture:** The frontend is built using a component-based architecture, which makes the code modular and reusable.
*   **Clear Separation of Concerns:** The code is well-organized, with a clear separation of concerns between components, pages, and services.
*   **Use of Modern React Features:** The application uses modern React features like hooks and functional components.

### 5.2. Backend

*   **RESTful API:** The backend exposes a RESTful API for the frontend to consume.
*   **Asynchronous Operations:** The backend makes extensive use of asynchronous operations to handle I/O-bound tasks like database queries and web scraping.
*   **Error Handling:** The backend includes error handling to gracefully handle unexpected errors.

## 6. Potential Future Enhancements

The AYHS project has a solid foundation, but there are several areas where it could be enhanced in the future.

*   **Real-time Chat:** The community forum could be enhanced with real-time chat functionality using WebSockets.
*   **Telemedicine Integration:** The application could be integrated with a telemedicine platform to allow users to consult with doctors remotely.
*   **Personalized Health Dashboard:** A personalized health dashboard could be created to provide users with a holistic view of their health.
*   **Mobile Application:** A mobile application could be developed to provide users with access to the application's features on the go.

## 7. Conclusion

The AYHS project is a well-designed and feature-rich web application that has the potential to be a valuable tool for users to manage their health. The project's modern technology stack, modular architecture, and clear separation of concerns make it a good starting point for future development.
