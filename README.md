# Event Talks App

This is a simple, single-page web application designed to display the schedule for a one-day event filled with technical talks. It features dynamic schedule generation, talk details, and category-based filtering.

## Features

*   **Dynamic Schedule:** Displays a complete schedule of talks and a lunch break with calculated timings.
*   **Talk Details:** Each talk includes title, speakers, categories, duration, and a description.
*   **Category Filtering:** Users can filter talks by category to easily find relevant sessions.
*   **Automated Timing:** The server automatically calculates talk start and end times, including transitions and a lunch break.

## Technologies Used

*   **Backend:** Node.js with Express.js
*   **Frontend:** HTML, CSS, JavaScript

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Make sure you have Node.js and npm (Node Package Manager) installed on your system.

### Installation

1.  Clone the repository (if you haven't already):
    ```bash
    git clone https://github.com/rominirani/romin-event-talks-app.git
    cd romin-event-talks-app
    ```

2.  Install the Node.js dependencies:
    ```bash
    npm install
    ```

### Running the Application

1.  Start the Node.js server:
    ```bash
    node server.js
    ```
    You should see a message in your terminal indicating that the server is running, typically on `http://localhost:3000`.

2.  Open your web browser and navigate to:
    ```
    http://localhost:3000
    ```
    You should see the event talks website with the schedule and category filter.

## Project Structure

```
event-talks-app/
├── public/
│   ├── index.html    # Main HTML structure
│   ├── style.css     # Styling for the website
│   └── script.js     # Frontend JavaScript for dynamic content and filtering
├── server.js         # Node.js backend server
├── package.json      # Project dependencies and scripts
├── package-lock.json # Dependency lock file
└── .gitignore        # Specifies intentionally untracked files to ignore
```
