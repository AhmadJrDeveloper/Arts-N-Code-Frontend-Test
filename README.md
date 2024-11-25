
# Frontend - React Application

## Overview

This is the frontend for a **PERN stack** application, built using **React.js**, **Material UI (MUI)**, **Google Maps API**, **SweetAlert2**, and **Axios**. The frontend interacts with the backend to display businesses and their location, manage admin authentication, and show interactive maps and alerts.

---

## Libraries and API

- **Material UI (MUI)** for modern UI components and styling
- **Google Maps API** integration for displaying maps
- **SweetAlert2** for interactive alerts
- **Axios** for making HTTP requests to the backend

---

## Tech Stack

- **React.js** (Frontend framework)
- **Material UI (MUI)** (UI components)
- **Google Maps API** (Maps integration)
- **SweetAlert2** (Alert popups)
- **Axios** (HTTP requests)

---

## Prerequisites

Before running this project, ensure you have the following installed on your local machine:

- **Node.js** (Runtime)  
  You can download Node.js from the official website:  
  [Node.js download](https://nodejs.org/en/download/)

- **Google Maps API Key**  
  You'll need to set up a Google Maps API key. Follow the instructions in the [Google Cloud Console](https://console.cloud.google.com/) to get your API key.

---

## Installation

Follow these steps to get the frontend up and running:

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   ```

2. **Navigate to the frontend directory:**

   ```bash
   cd <frontend-folder>
   ```

3. **Install dependencies:**

   Make sure you have **Node.js** installed. Once you have it, install the necessary dependencies by running:

   ```bash
   npm install
   ```

4. **Set up Google Maps API Key:**

   - Obtain your Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/).
   - Create a `.env` file in the root of the project directory and add your Google Maps API key like so:

     ```bash
     REACT_APP_API_KEY=your-google-maps-api-key
     ```

5. **Run the app:**

   Start the development server by running:

   ```bash
   npm start
   ```

   This will start the frontend application on [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

In the project directory, you can run the following commands:

### `npm start`

Runs the app in the development mode.Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload when you make changes, and you may also see lint errors in the console.


## Libraries

- **Material UI (MUI):**  
  MUI is used for various components like buttons, modals, and form elements to ensure a modern and responsive UI.

- **Google Maps API Integration:**  
  The app uses the Google Maps API to display interactive maps that users can interact with.

- **SweetAlert2:**  
  SweetAlert2 is used to display stylish and interactive alert popups, improving user experience.

- **Axios:**  
  Axios is used to handle HTTP requests to the backend for fetching and posting data.

---

